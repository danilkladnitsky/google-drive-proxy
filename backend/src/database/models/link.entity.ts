import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from './file.entity';

@Entity()
export class Link extends BaseEntity {
  @OneToOne(() => File, (file) => file.id)
  file: File;

  @Column()
  link: string;

  @Column()
  downloads: number;
}
