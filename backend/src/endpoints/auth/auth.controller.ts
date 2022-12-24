import {
  Controller,
  Get,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { UserAuthDTO } from 'src/common/types/user';
import { StorageAuthService } from 'src/providers/storageAuth/storageAuth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController<U extends UserAuthDTO> {
  constructor(
    private readonly userService: UserService,
    private readonly authProvider: StorageAuthService<U>,
  ) {}
  @Get('link')
  async getAuthLink(
    @Query('redirectUri') redirectUri?: string,
  ): Promise<{ link: string }> {
    const link = await this.authProvider.generateLoginLink(redirectUri);

    return { link };
  }

  @Get('token')
  async getToken(@Query('code') code: string, @Res() response: Response) {
    try {
      const token = await this.authProvider.getUserToken(code);
      const userEntity = await this.authProvider.retrieveUserByToken(token);

      const { id: googleId, name, picture } = userEntity;
      const client = { googleId, name, picture, token };
      const user = await this.userService.createClient(client);

      response.redirect(process.env.FRONTEND_URL + `?id=${user.googleId}`);
      // TODO: redirect to the frontend
      return 'Авторизация прошла успешно';
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  @Get('user')
  async getUserByToken(@Query('token') token: string) {
    try {
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
