import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IStorageAuthProvider } from 'src/common/interfaces/storage';
import { UserAuthDTO } from 'src/common/types/user';
import { File } from 'src/database/models/file.entity';
import { Link } from 'src/database/models/link.entity';
import { DriveManagerProvider } from 'src/providers/storageManagers/drive/driveManager.provider';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

export class StorageService {
  constructor(
    private readonly userService: UserService,
    @Inject(DriveManagerProvider)
    private readonly storage: IStorageAuthProvider<UserAuthDTO>,
    @InjectRepository(File) readonly fileRepository: Repository<File>,
    @InjectRepository(Link) readonly linkRepository: Repository<Link>,
  ) {}

  async getFiles(userId: number, folderName: string) {
    const user = await this.userService.getUserById(userId);

    return this.storage.readFiles(user.token, folderName);
  }

  async createFolder(userId: number, folderName: string) {
    const user = await this.userService.getUserById(userId);

    return this.storage.createFolder(user.token, folderName);
  }

  async shareFile(userId: number, driveId: string) {
    const file = await this.fileRepository.findOneBy({ driveId });

    if (file) {
      return file.link;
    }

    const client = await this.userService.getUserById(userId);
    const url = await this.storage.shareFile(client.token, driveId);

    const link = { link: url, downloads: 0, client };

    const savedLink = await this.linkRepository.save(link);
    await this.fileRepository.save({ client, driveId, link });

    return savedLink;
  }
}
