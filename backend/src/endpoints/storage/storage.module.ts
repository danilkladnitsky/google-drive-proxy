import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { StorageAuthModule } from 'src/providers/storageAuth/storageAuth.module';
import { UserService } from '../user/user.service';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService, UserService],
  controllers: [StorageController],
  imports: [TypeOrmModule.forFeature([Client]), StorageAuthModule],
})
export class StorageModule {}
