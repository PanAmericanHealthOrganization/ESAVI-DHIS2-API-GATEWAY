import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CountryOfSale } from './countryOfSale.entity';
/**
 *
 */
@Entity({ name: 'maholder', schema: 'who_drug' })
export class Maholder extends CustomBaseEntity {
  /**
   *
   */
  @Column({
    primary: true,
    unique: true,
    name: 'id',
    type: 'char',
    length: 11,
    comment: 'Identificador único del registro',
  })
  id: string;

  /**
   *
   */
  @Column({
    name: 'name',
    comment: 'Nombre del titular del registro',
    length: 512,
  })
  name: string;

  /**
   *
   */
  @Column({
    name: 'medicinal_product_id',
    nullable: true,
    comment: 'Código del producto',
  })
  medicinalProductID: number;

  /**
   *
   */
  @ManyToOne(() => CountryOfSale)
  @JoinColumn({
    name: 'cos_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_countrySale__maholder',
  })
  countrySale: CountryOfSale;
}
