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
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import type {IVideoCall} from "@rn-video-call/base";
import {Base, COLLECTION_PATHS} from "@rn-video-call/base";
import {SetUpCallbacksType, SetUpInCallPropertiesType} from "./webrtcFirebase.types";

export const peerConstraints = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

let webRTCFirbaseInstance: WebRTCFirbase

class WebRTCFirbase extends Base implements IVideoCall {
  peerConnection: RTCPeerConnection | null = null;
  private connecting = false;
  private db: FirebaseFirestoreTypes.Module;
  private localMediaStream: MediaStream | null = null;
  private remoteMediaStream: MediaStream | null = null;
  private isMuted = false;
  private isFrontCamera = true;
  private localCameraEnabled = true;
  private cameraCount = 0;
  private remoteCandidates: (RTCIceCandidate | null)[] = [];

  private setLocalStream: ((arg0: MediaStream | null) => void) | undefined;
  private setRemoteStream: ((arg0: MediaStream | null) => void) | undefined;
  private setGettingCall: ((isGettingCall: boolean) => void) | undefined;
  private setIsMuted: ((isMuted: boolean) => void) | undefined;
  private setIsFrontCamera: ((isFrontCamera: boolean) => void) | undefined;
  private setLocalCameraEnabled: ((enabled: boolean) => void) | undefined;
  private setRemoteCameraEnabled: ((enabled: boolean) => void) | undefined;

  constructor() {
    super({});
    this.db = firestore();
  }

  setupInCallProperties = ({
    setIsMuted,
    setIsFrontCamera,
    setLocalCameraEnabled,
    setRemoteCameraEnabled,
  }: SetUpInCallPropertiesType) => {
    this.setIsMuted = setIsMuted;
    this.setIsFrontCamera = setIsFrontCamera;
    this.setLocalCameraEnabled = setLocalCameraEnabled;
    this.setRemoteCameraEnabled = setRemoteCameraEnabled;
  }

  setupCallbacks = ({
    setLocalStream,
    setRemoteStream,
    setGettingCall,
  }: SetUpCallbacksType) => {
    this.setLocalStream = setLocalStream;
    this.setRemoteStream = setRemoteStream;
    this.setGettingCall = setGettingCall;

    const cRef = this.db
      .collection(COLLECTION_PATHS.MEETS)
      .doc(COLLECTION_PATHS.ROOM_ID);

    cRef.onSnapshot(
      async (snapshot: any) => {
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

          this.processCandidates();
        }

        if (data && data.offer && !this.connecting) {
          this.setGettingCall?.(true);
          this.listenRemoteHangup()
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  handleRemoteCandidate = (iceCandidate: any) => {
    iceCandidate = new RTCIceCandidate(iceCandidate);

    if (this.peerConnection?.remoteDescription == null) {
      return this.remoteCandidates.push(iceCandidate);
    }

    return this.peerConnection.addIceCandidate(iceCandidate);
  };

  processCandidates = () => {
    if (this.remoteCandidates.length < 1) {
      return;
    }

    this.remoteCandidates.map((candidate) =>
      this.peerConnection?.addIceCandidate(candidate)
    );
    this.remoteCandidates = [];
  };

  listenRemoteHangup = () => {
    const qdelete = query(collection(this.db, COLLECTION_PATHS.MEETS));
    const subscriber = qdelete.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "removed") {
            this.hangup();
            subscriber();
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  collectIceCandidates = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string
  ) => {
    const candidateCollection = collection(
      this.db,
      COLLECTION_PATHS.MEETS,
      COLLECTION_PATHS.ROOM_ID,
      localName
    );

    if (this.peerConnection) {
      // on new ICE candidate add it to firestore
      this.peerConnection.addEventListener("icecandidate", (event) => {
        // When you find a null candidate then there are no more candidates.
        // Gathering of candidates has finished.

        if (!event.candidate) {
          return;
        }

        // Send the event.candidate onto the person you're calling.
        // Keeping to Trickle ICE Standards, you should send the candidates immediately.
        candidateCollection.add(event.candidate.toJSON());
      });

      this.peerConnection.addEventListener(
        "iceconnectionstatechange",
        (event) => {
          console.log(
            "iceconnectionstatechange",
            this.peerConnection?.iceConnectionState
          );
        }
      );

      this.peerConnection.addEventListener("connectionstatechange", (event) => {
        console.log(
          "connectionstatechange",
          event,
          this.peerConnection?.connectionState
        );
      });

      this.peerConnection.addEventListener("signalingstatechange", (event) => {
        console.log(
          "signalingstatechange",
          event,
          this.peerConnection?.signalingState
        );
      });
    }

    // Get the ICE candidate added to firestore and update the local
    cRef.collection(remoteName).onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            this.handleRemoteCandidate(change.doc.data());
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  streamCleanUp = () => {
    console.log("streamCleanUp");

    if (this.localMediaStream) {
      this.localMediaStream.getTracks().forEach((t) => t.stop());
      this.localMediaStream.release();
    }

    if (this.remoteMediaStream) {
      this.remoteMediaStream.getTracks().forEach((t) => t.stop());
      this.remoteMediaStream.release();
    }
    this.localMediaStream = null;
    this.remoteMediaStream = null;

    this.setLocalStream?.(null);
    this.setRemoteStream?.(null);
  };

  firebaseCleanUp = async () => {
    console.log("firebaseCleanUp");
    const cRef = doc(this.db, COLLECTION_PATHS.MEETS, COLLECTION_PATHS.ROOM_ID);
    if (cRef) {
      const qee = query(collection(cRef, COLLECTION_PATHS.CALLEE));
      const calleeCandidate = await getDocs(qee);
      calleeCandidate.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      const qer = query(collection(cRef, COLLECTION_PATHS.CALLER));
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
      this.peerConnection = new RTCPeerConnection(peerConstraints);

      // Get the audio and video stream for the call
      await this.getAvailableMediaDevices();

      const stream = await this.getStream();

      if (stream) {
        this.setLocalStream?.(stream);
        this.localMediaStream = stream;

        this.localMediaStream.getTracks().forEach((track) => {
          if (this.peerConnection && this.localMediaStream) {
            this.peerConnection.addTrack(track, this.localMediaStream);
          }
        });

        this.peerConnection.addEventListener("track", (event) => {
          this.remoteMediaStream = this.remoteMediaStream || new MediaStream();

          event.streams[0].getTracks().forEach((t) => {
            this.remoteMediaStream?.addTrack(t);
          });

          this.setRemoteStream?.(this.remoteMediaStream);

          // this.remoteMediaStream?.getAudioTracks().forEach((track) => {
          //   track.addEventListener("mute", (e) => {
          //     console.log("remoteAudioTracks mute", e);
          //     this.setIsMuted?.(false);
          //     this.isMuted = false;
          //   });

          //   track.addEventListener("unmute", (e) => {
          //     console.log("remoteAudioTracks unmute", e);
          //     this.setIsMuted?.(true);
          //     this.isMuted = true;
          //   });
          // });

          this.remoteMediaStream?.getVideoTracks().forEach((track) => {
            track.addEventListener("mute", (e) => {
              console.log("remoteVideoTracks mute", e);
              this.setRemoteCameraEnabled?.(false);
            });

            track.addEventListener("unmute", (e) => {
              console.log("remoteVideoTracks unmute", e);
              this.setRemoteCameraEnabled?.(true);
            });
          });
        });

        this.setIsMuted?.(false);
        this.isMuted = false;
        this.setIsFrontCamera?.(true);
        this.isFrontCamera = true;
        this.setLocalCameraEnabled?.(true);
        this.localCameraEnabled = true;
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
    const cRef = doc(this.db, COLLECTION_PATHS.MEETS, COLLECTION_PATHS.ROOM_ID);

    this.listenRemoteHangup()

    // Exchange the ICE candidates between the caller and callee
    await this.collectIceCandidates(
      cRef,
      COLLECTION_PATHS.CALLER,
      COLLECTION_PATHS.CALLEE
    );

    if (this.peerConnection) {
      // Create the offer for the call
      // Store the offer under the document
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

        await setDoc(cRef, cWithOffer);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  join = async () => {
    console.log("Joining the call");
    this.connecting = true;
    this.setGettingCall?.(false);

    const cRef = doc(this.db, COLLECTION_PATHS.MEETS, COLLECTION_PATHS.ROOM_ID);
    const offer = (await cRef.get()).data()?.offer;

    if (offer) {
      // Setup Webrtc
      await this.setup();

      // Exchange the ICE candidates
      // Check the parameters, Its reversed. Since the joining part is callee
      await this.collectIceCandidates(
        cRef,
        COLLECTION_PATHS.CALLEE,
        COLLECTION_PATHS.CALLER
      );

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

        this.processCandidates();

        await cRef.update(cWithAnswer);
      }
    }
  };

  hangup = async () => {
    console.log("hangup");
    this.setGettingCall?.(false);
    this.connecting = false;
    this.streamCleanUp();
    this.firebaseCleanUp();
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  };

  toggleActiveMicrophone = async () => {
    console.log("toggleActiveMicrophone");
    if (!this.localMediaStream) {
      return;
    }

    try {
      const t = this.localMediaStream?.getAudioTracks()[0];
      t.enabled = !t.enabled;

      this.setIsMuted?.(!this.isMuted);
      this.isMuted = !this.isMuted;
    } catch (error) {
      console.log(error);
    }
  };

  switchingCamera = async () => {
    console.log("switchingCamera");
    if (!this.localMediaStream) {
      return;
    }

    try {
      // Taken from above, we don't want to flip if we don't have another camera.
      if (this.cameraCount < 2) {
        return;
      }

      const t = this.localMediaStream?.getVideoTracks()[0];
      t._switchCamera();

      this.setIsFrontCamera?.(!this.isFrontCamera);
      this.isFrontCamera = !this.isFrontCamera;
    } catch (error) {
      console.log(error);
    }
  };

  toggleCameraEnabled = async () => {
    console.log("toggleCameraEnabled");
    if (!this.localMediaStream) {
      return;
    }

    try {
      const t = this.localMediaStream?.getVideoTracks()[0];
      t.enabled = !t.enabled;

      this.setLocalCameraEnabled?.(!this.localCameraEnabled);
      this.localCameraEnabled = !this.localCameraEnabled;
    } catch (error) {
      console.log(error);
    }
  };

  getAvailableMediaDevices = async () => {
    try {
      this.cameraCount = 0;
      const devices: any = await mediaDevices.enumerateDevices();

      devices.map((device: {kind: string}) => {
        if (device.kind != "videoinput") {
          return;
        }

        this.cameraCount = this.cameraCount + 1;
      });
    } catch (err) {
      console.log(err);
    }
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

export const getWebRTCFirbaseProxyInstance = (props = {}) => {
  if (!webRTCFirbaseInstance) {
    webRTCFirbaseInstance = createWebRTCFirbaseProxy(props);
  }
  return webRTCFirbaseInstance;
}

export const createWebRTCFirbaseProxy = ({ }) => {
  return new WebRTCFirbase();
};
