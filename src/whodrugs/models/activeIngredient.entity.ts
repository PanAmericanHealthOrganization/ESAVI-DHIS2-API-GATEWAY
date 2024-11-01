import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Drug } from './drug.entity';
import { IActiveIngredient } from './dtos/drug.dto';
/**
 *
 */
@Entity({ schema: 'who_drug', name: 'active_ingredients' })
export class ActiveIngredient
  extends CustomBaseEntity
  implements IActiveIngredient
{
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
  @Column({ name: 'aci_ingredient', nullable: true })
  ingredient: string;

  /**
   *
   */
  @ManyToOne(() => Drug)
  @JoinColumn({ name: 'dru_id', referencedColumnName: 'id' })
  drug: Drug;
}

export class ActiveIngredientBuilder {
  private activeIngredient: ActiveIngredient;

  constructor() {
    this.activeIngredient = new ActiveIngredient();
  }
  public withId(id: string): ActiveIngredientBuilder {
    this.activeIngredient.id = id;
    return this;
  }

  public withIngredient(ingredient: string): ActiveIngredientBuilder {
    this.activeIngredient.ingredient = ingredient;
    return this;
  }

  public withDrug(drug: Drug): ActiveIngredientBuilder {
    this.activeIngredient.drug = drug;
    return this;
  }

  public build(): ActiveIngredient {
    return this.activeIngredient;
  }
}
