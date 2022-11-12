import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private service: StorageService) {}

  @Get('files/:folderName?')
  @UseGuards(AuthGuard)
  async getFiles(@UserId() userId, @Param('folderName') folderName: string) {
    const files = await this.service.getFiles(userId, folderName);
    console.log(files);

    return userId;
  }
}
