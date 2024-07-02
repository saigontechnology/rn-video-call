import { Button, StyleSheet, Text, View } from 'react-native';

import * as RnVideoCall from 'rn-video-call';

import {VideoCallContext, ClientRegistry, ClientKind} from 'rn-video-call'

export default function App() {

  const client = ClientRegistry.getInstance(ClientKind.WEBRTC_FIREBASE)
  return (
    <VideoCallContext.Provider value={client}>
      <View style={styles.container}>
        <Text>{RnVideoCall.hello()}</Text>
        <>
          <Button title='SETUP' onPress={client.setup}/>
          <Button title='CREATE' onPress={client.create}/>
          <Button title='JOIN' onPress={client.join}/> 
          <Button title='HANUP' onPress={client.hangup}/> 
          <Button title='CLEAN' onPress={client.cleanUp}/> 
        </>
      </View>
    </VideoCallContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
