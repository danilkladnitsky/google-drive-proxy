import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { GoogleAuthProvider } from 'src/providers/google/google.provider';

@Catch(ForbiddenException)
export class AuthFilter implements ExceptionFilter {
  authProvider: GoogleAuthProvider;
  constructor() {
    this.authProvider = new GoogleAuthProvider();
  }
  async catch(exception: ForbiddenException, host: ArgumentsHost) {
    const link = await this.authProvider.generateLoginLink();
    host.switchToHttp().getResponse().redirect(link);
  }
}
