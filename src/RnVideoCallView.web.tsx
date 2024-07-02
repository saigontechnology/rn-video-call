import * as React from 'react';

import { RnVideoCallViewProps } from './RnVideoCall.types';

export default function RnVideoCallView(props: RnVideoCallViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
