import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActiveIngredient } from './activeIngredient.entity';
import { IIngredientTranslation } from './dtos/drug.dto';

/**
 *
 */
@Entity({
  schema: 'who_drug',
  name: 'ingredient_translation',
})
export class IngredientTranslation extends CustomBaseEntity implements IIngredientTranslation {
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
  @Column({ name: 'int_languageCode' })
  languageCode: string;

  /**
   *
   */
  @Column({ name: 'int_ingredient' })
  ingredient: string;

  /**
   *
   */
  @ManyToOne(() => ActiveIngredient)
  @JoinColumn({
    name: 'aci_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_active_Ingredient__maholder',
  })
  activeIngredient: ActiveIngredient;
}
