import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RnVideoCallViewProps } from './RnVideoCall.types';

const NativeView: React.ComponentType<RnVideoCallViewProps> =
  requireNativeViewManager('RnVideoCall');

export default function RnVideoCallView(props: RnVideoCallViewProps) {
  return <NativeView {...props} />;
}
