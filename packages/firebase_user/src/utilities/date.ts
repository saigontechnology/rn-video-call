import firestore from '@react-native-firebase/firestore';

const getCurrentTimestamp = () => {
  const {seconds, nanoseconds} = firestore.Timestamp.now();
  const msCurrentTime = seconds * 1000 + nanoseconds / 1000000;
  return Math.floor(msCurrentTime);
};

export {getCurrentTimestamp};
