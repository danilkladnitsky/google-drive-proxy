import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/typeorm.config';
import { AuthModule } from './endpoints/auth/auth.module';
import { StorageModule } from './endpoints/storage/storage.module';
import { UserModule } from './endpoints/user/user.module';

const DatabaseModule = TypeOrmModule.forRoot(configService.getTypeOrmConfig());

@Module({
  imports: [DatabaseModule, StorageModule, AuthModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
