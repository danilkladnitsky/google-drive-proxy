import { InjectRepository } from '@nestjs/typeorm';
import { UserWithTokenDTO } from 'src/common/types/user';
import { Client } from 'src/database/models/client.entity';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}
  async createClient(user: UserWithTokenDTO) {
    return this.clientRepository.save(user);
  }

  async getUserById(id: number) {
    return await this.clientRepository.findOneBy({ id });
  }
}
