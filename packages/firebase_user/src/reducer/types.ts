import {Dispatch} from 'react';
import {IUserInfo} from '../interfaces';
import * as userActions from './action'

export type UserState = {
  userInfo?: IUserInfo
};

export type IUserContext = {
  userState: UserState;
  userDispatch: Dispatch<UserActionTypes>;
}

type UserActionKeys = keyof typeof userActions

export type UserActionTypes = ReturnType<typeof userActions[UserActionKeys]>
