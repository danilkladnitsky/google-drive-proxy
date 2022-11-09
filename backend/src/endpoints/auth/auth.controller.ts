import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { google } from 'googleapis';
import { OAUTH_SCOPE } from 'src/common/const/oAuth.const';
import { AuthService } from './auth.service';

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI_DEV;

@Controller('auth')
export class AuthController {
  oAuthClient: any;
  constructor(private authService: AuthService) {
    this.oAuthClient = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri,
    );
  }

  @Get('link')
  getAuthLink(): { link: string } {
    const link = this.oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: OAUTH_SCOPE,
    }) as string;

    return { link };
  }

  @Get('token')
  async getToken(@Query('code') code: string) {
    try {
      const {
        tokens: { access_token },
      } = await this.oAuthClient.getToken(code);

      await this.oAuthClient.setCredentials({
        access_token,
      });
      const oAuth = google.oauth2({ version: 'v2', auth: this.oAuthClient });

      const { data } = await oAuth.userinfo.get();

      await this.authService.createClient(data, access_token);

      // TODO: redirect to the frontend
      return 'Авторизация прошла успешно';
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Авторизация через Google не прошла',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
