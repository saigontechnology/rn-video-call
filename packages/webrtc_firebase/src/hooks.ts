import {useContext} from 'react';
import {VideoCallContext} from './VideoCallProvider';
import type {VideoCallState} from './reducer';

const useVideoCallContext = () => {
    return useContext(VideoCallContext);
};

/**
 * Custom hook to select a specific part of the video call state.
 * @param selector A function that takes the video call state and returns a specific part of it.
 * @returns The part of the video ca;; state selected by the selector function.
 */
const useVideoCallSelector = <T>(selector: (callState: VideoCallState) => T): T => {
    const {videoCallState} = useVideoCallContext();
    return selector(videoCallState);
};

export {useVideoCallContext, useVideoCallSelector};
