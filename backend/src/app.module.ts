import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/typeorm.config';
import { AuthModule } from './endpoints/auth/auth.module';
import { StorageModule } from './endpoints/storage/storage.module';

const DatabaseModule = TypeOrmModule.forRoot(configService.getTypeOrmConfig());

@Module({
  imports: [DatabaseModule, StorageModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
