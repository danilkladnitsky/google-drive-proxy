import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { StorageAuthService } from 'src/providers/storageAuth/storageAuth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, StorageAuthService],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class AuthModule {}
