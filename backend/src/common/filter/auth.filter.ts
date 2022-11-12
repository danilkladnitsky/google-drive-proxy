import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { IStorageAuthProvider } from '../interfaces/storage';
import { UserAuthDTO } from '../types/user';

@Catch(ForbiddenException)
export class AuthFilter implements ExceptionFilter {
  constructor(
    private readonly authProvider: IStorageAuthProvider<UserAuthDTO>,
  ) {
    this.authProvider = authProvider;
  }
  async catch(exception: ForbiddenException, host: ArgumentsHost) {
    const link = await this.authProvider.generateLoginLink();
    host.switchToHttp().getResponse().redirect(link);
  }
}
