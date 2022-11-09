import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/database/models/client.entity';
import { Repository } from 'typeorm';

export class StorageService {
  constructor(@InjectRepository(Client) clientRepository: Repository<Client>) {}
}
