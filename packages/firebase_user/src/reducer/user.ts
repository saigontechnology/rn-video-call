import type {UserState, UserActionTypes} from './types';
import {UserActionKind} from './constants';

export const userReducer = (
  state: UserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case UserActionKind.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return {...state}
  }
};
