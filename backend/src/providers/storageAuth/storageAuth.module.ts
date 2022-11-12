import { Module } from '@nestjs/common';
import { DriveManagerModule } from '../storageManagers/drive/driveManager.module';
import { StorageAuthService } from './storageAuth.service';

@Module({
  providers: [StorageAuthService],
  imports: [DriveManagerModule],
  exports: [StorageAuthService],
})
export class StorageAuthModule {}
