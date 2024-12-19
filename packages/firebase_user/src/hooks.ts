import {useContext} from 'react';
import {FirestoreUserContext} from './FirestoreUserProvider';
import {UserState} from './reducer';

const useUserContext = () => {
  return useContext(FirestoreUserContext);
};

/**
 * Custom hook to select a specific part of the user state.
 * @param selector A function that takes the user state and returns a specific part of it.
 * @returns The part of the user state selected by the selector function.
 */
const useUserSelector = <T>(selector: (userState: UserState) => T): T => {
  const {userState} = useUserContext();
  return selector(userState);
};

export {useUserContext, useUserSelector};
