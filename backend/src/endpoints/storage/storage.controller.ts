import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { MimeType } from 'src/common/types/storage';
import { StorageService } from './storage.service';

@Controller('storage')
@UseGuards(AuthGuard)
export class StorageController {
  constructor(private service: StorageService) {}

  @Get('files')
  async getFiles(
    @UserId() userId,
    @Query('folder') folderId: string,
    @Query('mimeType') mimeType: MimeType,
  ) {
    return await this.service.getFiles(userId, folderId, mimeType);
  }

  @Post('folder')
  async createFolder(@UserId() userId, @Body('name') folderName: string) {
    return await this.service.createFolder(userId, folderName);
  }

  @Post('share/:fileId')
  async copyFile(@UserId() userId, @Param('fileId') fileId: string) {
    if (!fileId) {
      throw new BadRequestException(`${fileId} is not set`);
    }

    const link = await this.service.shareFile(userId, fileId);
    return { link: `${process.env.BACKEND_URL}link/${link}` };
  }

  @Get('shared-files')
  async getSharedFiles() {
    return await this.service.getSharedFiles();
  }

  @Get('links')
  async geSharedtLinks() {
    const links = await this.service.getLinks();

    return links.map((link) => ({
      ...link,
      link: `${process.env.BACKEND_URL}link/${link.link}`,
    }));
  }
}
