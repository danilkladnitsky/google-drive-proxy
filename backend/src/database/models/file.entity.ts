import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RootFile } from './root.file.entity';

@Entity()
export class File extends BaseEntity {
  @Column()
  driveId: string;

  @Column({ nullable: false })
  driveLink: string;

  @Column({ default: 0 })
  downloads: number;

  @ManyToOne(() => RootFile, (rootFile) => rootFile.id)
  @JoinColumn()
  rootFile: RootFile;
}
