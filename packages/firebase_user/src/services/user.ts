import firestore from '@react-native-firebase/firestore';
import {FireStoreCollection} from './collections';
import {FirestoreUserServices} from './firestore';
import {getCurrentTimestamp} from '../utilities';
import type {UserProfileProps} from '../interfaces'

const firestoreServices = FirestoreUserServices.getInstance();

const createUserProfile = async (userId: string, name: string) => {
  const userRef = firestore()
    .collection<Omit<UserProfileProps, 'id'>>(
      firestoreServices.getUrlWithPrefix(FireStoreCollection.users)
    )
    .doc(userId);
  const user = await userRef.get();
  if (!user.exists) {
    await userRef.set({
      created: getCurrentTimestamp(),
      status: 'online',
      name,
      updated: getCurrentTimestamp(),
    });
  }
};

export {createUserProfile};
