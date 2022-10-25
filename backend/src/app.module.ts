import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StorageModule } from './endpoints/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [AppController],
})
export class AppModule {}
