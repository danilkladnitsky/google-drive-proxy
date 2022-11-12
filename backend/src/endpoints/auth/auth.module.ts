import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { StorageAuthModule } from 'src/providers/storageAuth/storageAuth.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [TypeOrmModule.forFeature([Client]), StorageAuthModule],
})
export class AuthModule {}
