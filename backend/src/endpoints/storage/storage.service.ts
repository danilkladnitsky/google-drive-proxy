import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_DOWNLOADS } from 'src/common/const/app.const';
import { IStorageAuthProvider } from 'src/common/interfaces/storage';
import { MimeType } from 'src/common/types/storage';
import { UserAuthDTO } from 'src/common/types/user';
import { File } from 'src/database/models/file.entity';
import { Link } from 'src/database/models/link.entity';
import { RootFile } from 'src/database/models/root.file.entity';
import { DriveManagerProvider } from 'src/providers/storageManagers/drive/driveManager.provider';
import { generateLink } from 'src/utils/link';
import { LessThan, Repository } from 'typeorm';
import { UserService } from '../user/user.service';

export class StorageService {
  constructor(
    private readonly userService: UserService,
    @Inject(DriveManagerProvider)
    private readonly storage: IStorageAuthProvider<UserAuthDTO>,
    @InjectRepository(File) readonly fileRepository: Repository<File>,
    @InjectRepository(RootFile)
    readonly rootFileRepository: Repository<RootFile>,
    @InjectRepository(Link) readonly linkRepository: Repository<Link>,
  ) {}

  async getFiles(userId: number, folderName: string, mimeType: MimeType) {
    const user = await this.userService.getUserById(userId);

    return this.storage.readFiles(user.token, folderName, mimeType);
  }

  async createFolder(userId: number, folderName: string) {
    const user = await this.userService.getUserById(userId);

    return this.storage.createFolder(user.token, folderName);
  }

  async shareFile(userId: number, driveId: string) {
    const file = await this.rootFileRepository.find({
      where: { driveId },
      take: 1,
    });

    const rootFile = file[0];

    if (rootFile) {
      const file = await this.fileRepository.findBy({
        rootFile: { id: rootFile.id },
      });

      const copiedFile = file[0];

      const link = await this.linkRepository.find({
        relations: { file: true },
        where: { file: { id: copiedFile.id } },
      });

      return link[0].link;
    }

    const owner = await this.userService.getUserById(userId);
    const rootFileLink = await this.storage.shareFile(owner.token, driveId);

    const savedRootFile = await this.rootFileRepository.save({
      driveId,
      driveLink: rootFileLink,
      owner,
    });

    const copiedFileId = await this.storage.copyFile(owner.token, driveId);

    const copiedFileLink = await this.storage.shareFile(
      owner.token,
      copiedFileId,
    );

    const copiedFile = await this.fileRepository.save({
      driveId: copiedFileId,
      rootFile: savedRootFile,
      driveLink: copiedFileLink,
    });

    const generatedUrl = generateLink({ fileId: copiedFileId });

    const link = await this.linkRepository.save({
      file: copiedFile,
      downloads: 0,
      link: generatedUrl,
    });

    return link.link;
  }

  async getSharedFiles() {
    return await this.fileRepository.find();
  }

  async getLinks() {
    return await this.linkRepository.find();
  }
}
