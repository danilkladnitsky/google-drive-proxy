import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from './file.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  token: string;

  @OneToMany(() => File, (file) => file.client)
  files: File[];
}
