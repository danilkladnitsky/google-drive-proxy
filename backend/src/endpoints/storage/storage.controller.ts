import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private service: StorageService) {}

  @Get('files/:folderName?')
  @UseGuards(AuthGuard)
  getFiles(@Param('folderName') folderName: string) {
    return folderName;
  }
}
