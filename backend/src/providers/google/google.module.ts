import { Module } from '@nestjs/common';
import { GoogleAuthProvider } from './google.provider';

@Module({
  providers: [GoogleAuthProvider],
})
export class GoogleAuthModule {}
