import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { StorageService } from './storage.service';

@Controller('storage')
@UseGuards(AuthGuard)
export class StorageController {
  constructor(private service: StorageService) {}

  @Get('files/:folderName?')
  async getFiles(@UserId() userId, @Param('folderName') folderName: string) {
    return await this.service.getFiles(userId, folderName);
  }
  @Post('folder')
  async createFolder(@UserId() userId, @Body('name') folderName: string) {
    return await this.service.createFolder(userId, folderName);
  }
}
