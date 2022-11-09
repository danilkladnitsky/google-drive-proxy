import { google } from 'googleapis';
import { OAUTH_SCOPE } from 'src/common/const/oAuth.const';
import { GoogleDriveUserDTO } from 'src/common/types/user';

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI_DEV;

export class GoogleAuthProvider {
  oAuthClient: any;

  constructor() {
    this.oAuthClient = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri,
    );
  }

  async generateLoginLink(): Promise<string> {
    return this.oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: OAUTH_SCOPE,
    }) as string;
  }

  async getUserToken(code: string): Promise<string> {
    const {
      tokens: { access_token },
    } = await this.oAuthClient.getToken(code);

    return access_token;
  }

  async retrieveUserByToken(access_token: string): Promise<GoogleDriveUserDTO> {
    await this.oAuthClient.setCredentials({
      access_token,
    });
    const oAuth = google.oauth2({ version: 'v2', auth: this.oAuthClient });

    const { data } = await oAuth.userinfo.get();

    return data;
  }
}
