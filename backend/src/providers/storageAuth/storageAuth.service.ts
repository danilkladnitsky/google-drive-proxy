import { Inject, Injectable } from '@nestjs/common';
import { IStorageAuthProvider } from 'src/common/interfaces/storage';
import { UserAuthDTO } from 'src/common/types/user';
import { DriveManagerProvider } from '../storageManagers/drive/driveManager.provider';

@Injectable()
export class StorageAuthService<U extends UserAuthDTO> {
  oAuthClient: any;

  constructor(
    @Inject(DriveManagerProvider)
    private readonly authProvider: IStorageAuthProvider<U>,
  ) {}

  async generateLoginLink(redirectUri: string): Promise<string> {
    return this.authProvider.generateLoginLink(redirectUri);
  }

  async getUserToken(code: string): Promise<string> {
    return this.authProvider.generateToken(code);
  }

  async retrieveUserByToken(access_token: string): Promise<U> {
    return this.authProvider.getUserByToken(access_token);
  }
}
