import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Drug } from './drug.entity';
import { Maholder } from './maholder.entity';

@Entity({ name: 'country_sales', schema: 'who_drug' })
export class CountryOfSale extends CustomBaseEntity {
  constructor() {
    super();
  }
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
  @Column({ name: 'cos_country', comment: 'Pais en formato ISO iso3Code' })
  iso3Code: string;

  /**
   *
   */
  @Column({ name: 'cos_sale', nullable: true, comment: 'Porcentaje de venta' })
  sale: number;

  /**
   *
   */
  @Column({
    name: 'cos_medicinal_product_id',
    comment: 'Identificador del producto medico en el pais',
  })
  medicinalProductID: number;

  /**
   *
   */
  @ManyToOne(() => Drug)
  @JoinColumn({
    name: 'dru_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_drug__anatomical_therapeutic_chemical',
  })
  drug: Drug;

  /**
   *
   */
  @OneToMany(() => Maholder, (maholder) => maholder.countrySale)
  maholders: Maholder[];
}
