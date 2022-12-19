import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/database/models/file.entity';
import { Link } from 'src/database/models/link.entity';
import { RootFile } from 'src/database/models/root.file.entity';
import { StorageModule } from '../storage/storage.module';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  providers: [LinkService],
  controllers: [LinkController],
  imports: [StorageModule, TypeOrmModule.forFeature([Link, File, RootFile])],
})
export class LinkModule {}
