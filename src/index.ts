import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RnVideoCall.web.ts
// and on native platforms to RnVideoCall.ts
import RnVideoCallModule from './RnVideoCallModule';
import RnVideoCallView from './RnVideoCallView';
import { ChangeEventPayload, RnVideoCallViewProps } from './RnVideoCall.types';
import { VideoCallContext, useVideoCall, ClientRegistry, ClientKind } from './provider';

// Get the native constant value.
export const PI = RnVideoCallModule.PI;

export function hello(): string {
  return RnVideoCallModule.hello();
}

export async function setValueAsync(value: string) {
  return await RnVideoCallModule.setValueAsync(value);
}

const emitter = new EventEmitter(RnVideoCallModule ?? NativeModulesProxy.RnVideoCall);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RnVideoCallView, RnVideoCallViewProps, ChangeEventPayload };

export {VideoCallContext,  useVideoCall, ClientRegistry, ClientKind}
