import { Controller, Get, Query } from '@nestjs/common';
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
    console.log(code);

    const {
      tokens: { access_token },
    } = await this.oAuthClient.getToken(code);

    return { access_token };
  }
}
