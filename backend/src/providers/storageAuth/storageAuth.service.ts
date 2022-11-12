import { IStorageAuthProvider } from 'src/common/interfaces/storage';
import { UserAuthDTO } from 'src/common/types/user';

export class StorageAuthService<U extends UserAuthDTO> {
  oAuthClient: any;

  constructor(private readonly authProvider: IStorageAuthProvider<U>) {}

  async generateLoginLink(): Promise<string> {
    return this.authProvider.generateLoginLink();
  }

  async getUserToken(code: string): Promise<string> {
    return this.authProvider.generateToken(code);
  }

  async retrieveUserByToken(access_token: string): Promise<U> {
    return this.authProvider.getUserByToken(access_token);
  }
}
