import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'cie_10_es', schema: 'meddra' })
export class CIE10ES {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  code: string;
  @Column()
  code_0: string;
  @Column()
  code_1: string;
  @Column()
  code_2: string;
  @Column()
  code_3: string;
  @Column()
  code_4: string;
  @Column()
  description: string;
  @Column()
  level: number;
  @Column()
  source: string;
}
