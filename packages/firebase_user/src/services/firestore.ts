
import {
  type IUserInfo,
} from '../interfaces';

interface FirestoreUserProps {
  userInfo?: IUserInfo;
  prefix?: string;
}

export class FirestoreUserServices {
  private static instance: FirestoreUserServices;

  /** User configuration */
  userInfo: IUserInfo = null;
  prefix = '';

  /**
   * The constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() { }

  get userId(): string {
    if (!this.userInfo?.id) {
      console.error('Please set userInfo before call chat  function');
    }
    return this.userInfo?.id || '';
  }

  static getInstance = () => {
    if (!FirestoreUserServices.instance) {
      FirestoreUserServices.instance = new FirestoreUserServices();
    }
    return FirestoreUserServices.instance;
  };

  configuration = ({
    userInfo,
    prefix,
  }: FirestoreUserProps) => {
    if (userInfo) {
      this.userInfo = userInfo;
    }

    if (prefix) {
      this.prefix = prefix;
    }
  };

  getUrlWithPrefix = (url: string) =>
    this.prefix ? `${this.prefix}-${url}` : url;

  getConfiguration = <K extends keyof FirestoreUserProps>(key: K) => this[key];

}
