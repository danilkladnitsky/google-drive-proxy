import { InjectRepository } from '@nestjs/typeorm';
import { UserWithTokenDTO } from 'src/common/types/user';
import { Client } from 'src/database/models/client.entity';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}
  async createClient(
    user: UserWithTokenDTO,
  ): Promise<UserWithTokenDTO | Client> {
    const userExists = await this.getUserByProperty('googleId', user.googleId);

    if (userExists) {
      this.clientRepository.update({ googleId: user.googleId }, user);
      return await this.getUserByProperty('googleId', user.googleId);
    }

    return this.clientRepository.save(user);
  }

  async getUserById(id: number) {
    return await this.clientRepository.findOneBy({ id });
  }

  async getUserByProperty(property: string, value: any) {
    return await this.clientRepository.findOneBy({ [property]: value });
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
