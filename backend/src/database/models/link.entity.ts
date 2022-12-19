import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { File } from './file.entity';

@Entity()
export class Link extends BaseEntity {
  @Column()
  link: string;

  @OneToOne(() => File, (file) => file.driveLink)
  @JoinColumn()
  file: File;
}
