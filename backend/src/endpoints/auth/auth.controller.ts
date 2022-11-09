import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { GoogleAuthProvider } from 'src/providers/google/google.provider';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly authProvider: GoogleAuthProvider,
  ) {}
  @Get('link')
  async getAuthLink(): Promise<{ link: string }> {
    const link = await this.authProvider.generateLoginLink();

    return { link };
  }

  @Get('token')
  async getToken(@Query('code') code: string) {
    try {
      const token = await this.authProvider.getUserToken(code);
      const userEntity = await this.authProvider.retrieveUserByToken(token);

      const { id: googleId, name, picture } = userEntity;
      const client = { googleId, name, picture, token };
      await this.userService.createClient(client);

      // TODO: redirect to the frontend
      return 'Авторизация прошла успешно';
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
