import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService],
  controllers: [StorageController],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class StorageModule {}
