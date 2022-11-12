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

  async getUsers() {
    return await this.clientRepository.find();
  }

  async deleteUser(id: number) {
    try {
      await this.clientRepository.delete(id);
      return 'ok';
    } catch (error) {
      console.log(error);

      return 'error';
    }
  }
}
