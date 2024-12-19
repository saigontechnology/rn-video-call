import type { BaseEntity } from './base';

type UserStatus = 'online' | 'offline';

interface UserProfileProps extends BaseEntity {
  created?: number;
  name: string;
  status?: UserStatus;
  updated?: number;
  conversations?: string[];
}


type IUserInfo = ({
  id: string;
  name: string;
  avatar: string;
} & BaseEntity) | null

export { UserProfileProps, IUserInfo };
