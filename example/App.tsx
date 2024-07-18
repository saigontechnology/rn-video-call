import { Button, StyleSheet, View } from 'react-native';

import {VideoCallContext} from 'rn-video-call'
import {createWebRTCFirbaseProxy} from 'packages'

export default function App() {

  const client = createWebRTCFirbaseProxy({})
  
  return (
    <VideoCallContext.Provider value={client}>
      <View style={styles.container}>
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
