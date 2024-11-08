import { Base, IVideoCall } from "rn-video-call";
import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
} from "react-native-webrtc";
import firestore, {
  query,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  updateDoc,
  onSnapshot,
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { COLLECTION_PATHS } from "./constants";
import {
  SET_GETTING_CALL_CALLBACK_TYPE,
  SET_LOCAL_STREAM_CALLBACK_TYPE,
  SET_REMOTE_STREAM_CALLBACK_TYPE,
} from "./webrtcFirebase.types";

export const peerConstraints = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
  iceCandidatePoolSize: 10,
};

class WebRTCFirbase extends Base implements IVideoCall {
  peerConnection: RTCPeerConnection | null = null;
  private connecting: boolean = false;
  private db;
  private localMediaStream: MediaStream | null = null;
  private remoteMediaStream: MediaStream | null = null;

  private setLocalStreamCallback!: SET_LOCAL_STREAM_CALLBACK_TYPE;
  private setRemoteStreamCallback!: SET_REMOTE_STREAM_CALLBACK_TYPE;
  private setGettingCallCallBack!: SET_GETTING_CALL_CALLBACK_TYPE;

  constructor() {
    super({});
    this.db = firestore();
  }

  setupFirebase = (db: any) => {
    this.db = db;
  };

  setupCallbacks = (
    setLocalStreamCallback: SET_LOCAL_STREAM_CALLBACK_TYPE,
    setRemoteStreamCallback: SET_REMOTE_STREAM_CALLBACK_TYPE,
    setGettingCallCallBack: SET_GETTING_CALL_CALLBACK_TYPE
  ) => {
    this.setLocalStreamCallback = setLocalStreamCallback;
    this.setRemoteStreamCallback = setRemoteStreamCallback;
    this.setGettingCallCallBack = setGettingCallCallBack;

    const cRef = doc(this.db, "meets", "chatId");
    onSnapshot(cRef, async (snapshot: any) => {
      // On answer start the call
      const data = snapshot.data();
      if (
        this.peerConnection &&
        !this.peerConnection.remoteDescription &&
        data &&
        data.answer
      ) {
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }

      if (data && data.offer && !this.connecting) {
        this.setGettingCallCallBack?.(true);
      }
    });

    // On Delete of collection call hangup
    // The other side has clicked on hangup
    const qdelete = query(collection(cRef, "callee"));
    onSnapshot(qdelete, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "removed") {
          this.hangup();
        }
      });
    });
  };

  collectIceCandidates = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string
  ) => {
    console.log({ localName, remoteName });

    const candidateCollection = collection(
      this.db,
      COLLECTION_PATHS.MEETS,
      COLLECTION_PATHS.ROOM_ID,
      localName
    );

    if (this.peerConnection) {
      // on new ICE candidate add it to firestore
      this.peerConnection.addEventListener("icecandidate", (event) => {
        console.log("icecandidate");
        // When you find a null candidate then there are no more candidates.
        // Gathering of candidates has finished.
        if (!event.candidate) {
          return;
        }

        // Send the event.candidate onto the person you're calling.
        // Keeping to Trickle ICE Standards, you should send the candidates immediately.
        candidateCollection.add(event.candidate.toJSON());
      });
    }

    // Get the ICE candidate added to firestore and update the local PC
    cRef.collection(remoteName).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          console.log("remoteName", change.doc.data());
          const candidate = new RTCIceCandidate(change.doc.data());
          this.peerConnection?.addIceCandidate(candidate);
        }
      });
    });
  };

  streamCleanUp = () => {
    console.log("streamCleanUp");

    if (this.localMediaStream) {
      this.localMediaStream.getTracks().forEach((t) => t.stop());
      this.localMediaStream.release();
    }
    this.localMediaStream = null;
    this.remoteMediaStream = null;

    this.setLocalStreamCallback?.(null);
    this.setRemoteStreamCallback?.(null);
  };

  firebaseCleanUp = async () => {
    console.log("firebaseCleanUp");
    // const cRef = doc(this.db, COLLECTION_PATHS.MEETS, "chatId");
    const cRef = doc(this.db, "meets", "chatId");
    if (cRef) {
      const qee = query(collection(cRef, "callee"));
      const calleeCandidate = await getDocs(qee);
      calleeCandidate.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      const qer = query(collection(cRef, "caller"));
      const callerCandidate = await getDocs(qer);
      callerCandidate.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      deleteDoc(cRef);
    }
  };

  getConnecting = async () => {
    return this.connecting;
  };

  addEventListener<K extends keyof RTCPeerConnectionEventMap>(
    type: K,
    callback: (event: any) => void
  ) {
    if (this.peerConnection) {
      this.peerConnection.addEventListener(type, callback);
    }
  }

  getPeerConnection = () => {
    return this.peerConnection;
  };

  setup = async () => {
    console.log("Setup webrtc");
    try {
      const peerConnection = new RTCPeerConnection(peerConstraints);

      this.peerConnection = peerConnection

      this.peerConnection.addEventListener("track", (event) => {
        console.log("Got remote track:", event.streams[0]);
        this.remoteMediaStream = this.remoteMediaStream || new MediaStream();
        event.track && this.remoteMediaStream.addTrack(event.track);
        this.setRemoteStreamCallback(this.remoteMediaStream);
      });

      // Get the audio and video stream for the call
      const stream = await this.getStream();

      if (stream) {
        this.setLocalStreamCallback?.(stream);
        this.localMediaStream = stream;

        this.localMediaStream.getTracks().forEach((track) => {
          if (this.peerConnection) {
            this.peerConnection.addTrack(track, stream);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  create = async () => {
    console.log("calling");
    this.connecting = true;

    // setUp webrtc
    if (!this.peerConnection) {
      await this.setup();
    }

    // Document for the call
    const cRef = doc(this.db, "meets", "chatId");

    // Exchange the ICE candidates between the caller and callee
    await this.collectIceCandidates(cRef, "caller", "callee");

    if (this.peerConnection) {
      // Create the offer for the call
      // Store the offer under the document
      console.log("create");
      try {
        let sessionConstraints = {
          mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
            VoiceActivityDetection: true,
          },
        };
        const offerDescription = await this.peerConnection.createOffer(
          sessionConstraints
        );
        await this.peerConnection.setLocalDescription(offerDescription);

        const cWithOffer = {
          offer: {
            type: offerDescription.type,
            sdp: offerDescription.sdp,
          },
        };

        // cRef.set(cWithOffer)
        await setDoc(cRef, cWithOffer);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  join = async () => {
    console.log("Joining the call");
    this.connecting = true;
    this.setGettingCallCallBack?.(false);

    const cRef = doc(this.db, "meets", "chatId");
    // const cRef = doc(this.db, COLLECTION_PATHS.MEETS, "chatId");

    const offer = (await cRef.get()).data()?.offer;
    // const offer = (await getDoc(cRef)).data()?.offer;

    if (offer) {
      // Setup Webrtc
      await this.setup();

      // Exchange the ICE candidates
      // Check the parameters, Its reversed. Since the joining part is callee
      await this.collectIceCandidates(cRef, "callee", "caller");

      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        // Create the answer for the call
        // Updates the document with answer
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };

        // cRef.update(cWithAnswer)
        await updateDoc(cRef, cWithAnswer);
      }
    }
  };

  hangup = async () => {
    console.log("hangup");
    this.setGettingCallCallBack?.(false);
    this.connecting = false;
    this.streamCleanUp();
    this.firebaseCleanUp();
    if (this.peerConnection) {
      this.peerConnection.close();
    }
  };

  cleanUp = async () => {
    console.log("cleanUp");
  };

  getStream = async () => {
    let mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: "user",
      },
    };

    let isVoiceOnly = false;
    try {
      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

      if (isVoiceOnly) {
        let videoTrack = mediaStream.getVideoTracks()[0];
        videoTrack.enabled = false;
      }

      return mediaStream;
    } catch (err) {
      console.log("err", err);
      return null;
    }
  };
}

export const createWebRTCFirbaseProxy = ({}) => {
  return new WebRTCFirbase();
};

export { MediaStream };
