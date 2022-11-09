import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { GoogleAuthProvider } from 'src/providers/google/google.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthProvider],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class AuthModule {}
