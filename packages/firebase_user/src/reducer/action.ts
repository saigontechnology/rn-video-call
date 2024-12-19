import {IUserInfo} from '../interfaces';
import {UserActionKind} from './constants';

export const setUserInfo = (payload: IUserInfo) => ({
  type: UserActionKind.SET_USER_INFO,
  payload,
} as const);
