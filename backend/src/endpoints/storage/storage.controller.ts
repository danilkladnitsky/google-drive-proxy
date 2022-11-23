import {
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
import { StorageService } from './storage.service';

@Controller('storage')
@UseGuards(AuthGuard)
export class StorageController {
  constructor(private service: StorageService) {}

  @Get('files')
  async getFiles(@UserId() userId, @Query('folder') folderId: string) {
    return await this.service.getFiles(userId, folderId);
  }

  @Post('folder')
  async createFolder(@UserId() userId, @Body('name') folderName: string) {
    return await this.service.createFolder(userId, folderName);
  }

  @Post('share')
  async copyFile(@UserId() userId, @Body('fileId') fileId: string) {
    return await this.service.shareFile(userId, fileId);
  }
}
