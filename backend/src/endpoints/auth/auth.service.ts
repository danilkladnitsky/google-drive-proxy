import { InjectRepository } from '@nestjs/typeorm';
import { GoogleDriveUserDTO } from 'src/common/types/user';
import { Client } from 'src/database/models/client.entity';
import { Repository } from 'typeorm';

export class AuthService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}
  async createClient(user: GoogleDriveUserDTO, token: string) {
    const { id: googleId, name, picture } = user;
    const client = { googleId, name, picture, token };

    return this.clientRepository.save(client);
  }
}
