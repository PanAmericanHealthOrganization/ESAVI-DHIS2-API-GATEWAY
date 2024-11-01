import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
/**
 *
 */
@Entity({ name: 'gtw_parameter', schema: 'api_gateway', comment: 'Parametros de configuración' })
export class Parameter extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador único de la tabla' })
  id: number;
  /**
   *
   */
  @Column({ name: 'code', comment: 'Código del parámetro', length: 62 })
  @Index({ unique: true })
  code: string;
  /**
   *
   */
  @Column({ name: 'value', comment: 'Valor del parámetro', length: 512 })
  value: string;
  /**
   *
   */
  @Column({
    name: 'description',
    comment: 'Descripción del parametro',
    length: 2048,
  })
  description: string;
}
