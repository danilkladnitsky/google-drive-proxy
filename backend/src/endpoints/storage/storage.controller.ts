import { Controller, Get } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private service: StorageService) {}

  @Get('status')
  checkStatus(): string {
    return 'ok';
  }
}
