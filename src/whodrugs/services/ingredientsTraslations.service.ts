import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientTranslation } from '../models/ingredientTranslation.entity';
import { IIngredientTranslation } from '../models/dtos/drug.dto';
import { ActiveIngredient } from '../models/activeIngredient.entity';

@Injectable()
export class IngredientTranslationService {
  constructor(
    @InjectRepository(IngredientTranslation, 'who_drug')
    private readonly ingredientTranslationRepository: Repository<IngredientTranslation>,
  ) {}

  public async syncIngredientTraslations(
    ingredientTranslation: IIngredientTranslation[],
    activeIngredient: ActiveIngredient,
  ) {
    if (ingredientTranslation.length > 0) {
      for (const ingredient of ingredientTranslation) {
        //
        const ingredientEntity = new IngredientTranslation();
        ingredientEntity.ingredient = ingredient.ingredient;
        ingredientEntity.languageCode = ingredient.languageCode;
        ingredientEntity.activeIngredient = activeIngredient;
        //
        await this.ingredientTranslationRepository.save(ingredientEntity);
      }
    }
  }
}
