import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity({ schema: 'meddra', name: 'med_request_history' })
@Index(['searchterm'])
export class MeddraQuery extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @Column({ name: 'searchterms', unique: true })
  searchterm: string;

  @Column({
    name: 'response',
    transformer: new EncryptionTransformer({
      key: process.env.MDD_TRANSFORM_KEY,
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: process.env.MDD_TRANSFORM_IV,
    }),
  })
  response: string;

  @Column({ name: 'date' })
  date: Date;
}
