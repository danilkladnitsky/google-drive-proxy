import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Client } from './client.entity';

@Entity()
export class RootFile extends BaseEntity {
  @Column()
  driveLink: string;

  @Column()
  driveId: string;

  @ManyToOne(() => Client, (client) => client.id)
  owner: Client;
}
