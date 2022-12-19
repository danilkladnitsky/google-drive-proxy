import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  token: string;

  @Column({ unique: true })
  googleId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  picture?: string;
}
