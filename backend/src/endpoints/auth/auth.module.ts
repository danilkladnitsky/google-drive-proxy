import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { GoogleAuthProvider } from 'src/providers/google/google.provider';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, GoogleAuthProvider],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class AuthModule {}
