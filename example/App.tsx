import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import {
    VideoCallContext,
    createWebRTCFirbaseProxy,
} from "rn-video-call";


import {Video, AppButton, GettingCall} from './components'

import { Colors } from "react-native/Libraries/NewAppScreen";

export default function App() {
    const client = useRef(createWebRTCFirbaseProxy({}));

    const [localStream, setLocalStream] = useState<any>();
    const [remoteStream, setRemoteStream] = useState<any>();
    const [gettingCall, setGettingCall] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [localCameraEnabled, setLocalCameraEnabled] = useState(true);
    const [remoteCameraEnabled, setRemoteCameraEnabled] = useState(true);
    const connecting = useRef(false);

    useEffect(() => {
        client.current.setupCallbacks({
            setLocalStream,
            setRemoteStream,
            setGettingCall,
            setIsMuted,
            setIsFrontCamera,
            setLocalCameraEnabled,
            setRemoteCameraEnabled
        });
    }, []);

    const onCreate = useCallback(() => {
        client.current.create();
    }, []);
    const onJoin = useCallback(() => {
        client.current.join();
    }, []);
    const onHangup = useCallback(() => {
        client.current.hangup();
    }, []);
    const onToggleIsMuted = useCallback(() => {
        client.current.toggleActiveMicrophone();
    }, []);
    const onToggleIsFrontCamera = useCallback(() => {
        client.current.switchingCamera();
    }, []);
    const onToggleCamera = useCallback(() => {
      client.current.toggleCameraEnabled();
    }, []);

    // remoteStream?.getTracks().forEach((track: any) => {
    //   console.log('remoteStream', track)
    // })


    // Displays both local and remote stream once call is connected
    if (localStream) {
        return (
            <Video
                localStream={localStream}
                remoteStream={remoteStream}
                hangup={onHangup}
                isMuted={isMuted}
                isFrontCam={isFrontCamera}
                localCameraEnabled={localCameraEnabled}
                remoteCameraEnabled={remoteCameraEnabled}
                toggleIsMuted={onToggleIsMuted}
                toggleIsFrontCam={onToggleIsFrontCamera}
                toggleCam={onToggleCamera}
            />
        );
    }

    // Displays the gettingCall Component
    if (gettingCall) {
        return <GettingCall hangup={onHangup} join={onJoin} />;
    }

    // Displays local stream on calling
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VideoCallContext.Provider value={client.current}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <AppButton backgroundColor="blue" onPress={onCreate}>
                        <Ionicons name="call" color="white" size={24} />
                    </AppButton>
                </View>
            </VideoCallContext.Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        backgroundColor: Colors.white,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    stream: {
        flex: 1,
    },
    footer: {
        backgroundColor: Colors.lighter,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});
