import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { File } from 'src/database/models/file.entity';
import { Link } from 'src/database/models/link.entity';
import { StorageAuthModule } from 'src/providers/storageAuth/storageAuth.module';
import { DriveManagerModule } from 'src/providers/storageManagers/drive/driveManager.module';
import { UserService } from '../user/user.service';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService, UserService],
  controllers: [StorageController],
  imports: [
    TypeOrmModule.forFeature([Client, File, Link]),
    StorageAuthModule,
    DriveManagerModule,
  ],
})
export class StorageModule {}
