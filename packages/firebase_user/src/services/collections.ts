import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

enum FireStoreCollection {
  users = 'users',
}

type FirestoreReference =
  | FirebaseFirestoreTypes.CollectionReference
  | FirebaseFirestoreTypes.DocumentReference;

export { FireStoreCollection, FirestoreReference };
