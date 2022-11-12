import { Module } from '@nestjs/common';
import { DriveManagerProvider } from './driveManager.provider';

@Module({ providers: [DriveManagerProvider], exports: [DriveManagerProvider] })
export class DriveManagerModule {}
