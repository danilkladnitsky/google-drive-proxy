import { Inject } from '@nestjs/common';
import { IStorageAuthProvider } from 'src/common/interfaces/storage';
import { UserAuthDTO } from 'src/common/types/user';
import { DriveManagerProvider } from 'src/providers/storageManagers/drive/driveManager.provider';
import { UserService } from '../user/user.service';

export class StorageService {
  constructor(
    private readonly userService: UserService,
    @Inject(DriveManagerProvider)
    private readonly storage: IStorageAuthProvider<UserAuthDTO>,
  ) {}

  async getFiles(userId: number, folderName: string) {
    const user = await this.userService.getUserById(userId);

    return this.storage.readFiles(user.token);
  }

  async createFolder(userId: number, folderName: string) {
    const user = await this.userService.getUserById(userId);

    return this.storage.createFolder(user.token, folderName);
  }
}
