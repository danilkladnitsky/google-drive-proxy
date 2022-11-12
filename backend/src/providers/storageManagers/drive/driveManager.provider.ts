import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import {
  google_client_id,
  google_client_secret,
  google_redirect_uri,
} from 'src/common/const/google.const';
import { OAUTH_SCOPE } from 'src/common/const/oAuth.const';
import { IStorageAuthProvider } from 'src/common/interfaces/storage';
import { MimeType } from 'src/common/types/storage';
import { GoogleDriveUserDTO } from 'src/common/types/user';

@Injectable()
export class DriveManagerProvider
  implements IStorageAuthProvider<GoogleDriveUserDTO>
{
  oAuthClient: any;

  constructor() {
    this.oAuthClient = new google.auth.OAuth2(
      google_client_id,
      google_client_secret,
      google_redirect_uri,
    );
  }

  get client() {
    return this.oAuthClient;
  }

  async generateLoginLink(): Promise<string> {
    return this.oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: OAUTH_SCOPE,
    }) as string;
  }

  async generateToken(code: string): Promise<string> {
    const {
      tokens: { access_token },
    } = await this.oAuthClient.getToken(code);

    return access_token;
  }

  async getUserByToken(access_token: string): Promise<GoogleDriveUserDTO> {
    await this.oAuthClient.setCredentials({
      access_token,
    });
    const oAuth = google.oauth2({ version: 'v2', auth: this.oAuthClient });

    const { data } = await oAuth.userinfo.get();

    return data as GoogleDriveUserDTO;
  }

  async readFiles(access_token: string) {
    this.oAuthClient.setCredentials({ access_token });
    const drive = google.drive({ version: 'v3', auth: this.oAuthClient });
    return (await drive.files.list()).data.files;
  }

  async createFolder(access_token: string, folder: string): Promise<string> {
    this.oAuthClient.setCredentials({ access_token });
    const drive = google.drive({ version: 'v3', auth: this.oAuthClient });

    const file = await drive.files.create({
      fields: 'id',
      requestBody: { name: folder, mimeType: MimeType.FOLDER },
    });

    return file.data.id;
  }
}