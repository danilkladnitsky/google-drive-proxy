import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Link extends BaseEntity {
  @Column()
  link: string;

  @Column()
  downloads: number;
}
