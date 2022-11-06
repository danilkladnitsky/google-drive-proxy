import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Client } from './client.entity';
import { Link } from './link.entity';

@Entity()
export class File extends BaseEntity {
  drive_link: string;

  @ManyToOne(() => Client, (client) => client.id)
  client: Client;

  @OneToOne(() => Link, (link) => link.id)
  link: Link;
}
