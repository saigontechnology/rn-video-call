import type {UserState} from './types';

export const getUserInfoSelector = (state: UserState) => state.userInfo;
