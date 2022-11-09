import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { GoogleDriveUserDTO } from 'src/common/types/user';
import { Client } from 'src/database/models/client.entity';
import { Repository } from 'typeorm';

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI_DEV;

export class AuthService {
  oAuthClient: any;
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {
    this.oAuthClient = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri,
    );
  }
  async createClient(user: GoogleDriveUserDTO, token: string) {
    const { id: googleId, name, picture } = user;
    const client = { googleId, name, picture, token };

    return this.clientRepository.save(client);
  }
}
