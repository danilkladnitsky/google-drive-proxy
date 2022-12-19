import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/database/models/link.entity';
import { Repository } from 'typeorm';
import { File } from 'src/database/models/file.entity';
import { RootFile } from 'src/database/models/root.file.entity';
import { StorageService } from '../storage/storage.service';
import {
  HOURS_BEFORE_LIMIT_RESET,
  MAX_DOWNLOADS,
} from 'src/common/const/app.const';
import * as moment from 'moment';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    @InjectRepository(RootFile)
    private readonly rootFileRepository: Repository<RootFile>,
    @Inject(StorageService)
    private readonly storageService: StorageService,
  ) {}

  public async getLink(url: string) {
    const link = await this.linkRepository.find({
      relations: { file: true },
      where: { link: url },
    });

    const matchedLink = link[0];

    const file = await this.fileRepository.find({
      where: { id: matchedLink.file.id },
    });

    const matchedFile = file[0];

    if (!file) {
      return;
    }

    const { update_date, downloads } = matchedFile;

    // download limit can be reset
    const dateSinceLastDownload = moment(update_date).unix();

    const hoursSinceLastDownload = moment()
      .subtract(dateSinceLastDownload)
      .hours();

    if (hoursSinceLastDownload >= HOURS_BEFORE_LIMIT_RESET) {
      await this.fileRepository.update(
        { id: matchedLink.id },
        { downloads: 0 },
      );
      return matchedFile.driveLink;
    }

    // download rate is not reached
    if (downloads < MAX_DOWNLOADS) {
      const downloads = matchedFile.downloads + 1;
      await this.fileRepository.update({ id: matchedFile.id }, { downloads });

      return matchedFile.driveLink;
    }

    // limit is about to be reached
    // need to copy file and share new link
  }
}
