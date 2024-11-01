import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ActiveIngredient } from '../models/activeIngredient.entity';
import { Drug } from '../models/drug.entity';
import { IActiveIngredient, IDrugResponse } from '../models/dtos/drug.dto';
import { IngredientTranslationService } from './ingredientsTraslations.service';

@Injectable()
export class ActiveIngredientsService {
  constructor(
    private readonly ingredientTranslationService: IngredientTranslationService,

    @InjectRepository(ActiveIngredient, 'who_drug')
    private readonly activeIngredientsRepository: Repository<ActiveIngredient>,
  ) {}

  public async getActiveIngredients(): Promise<ActiveIngredient[]> {
    return await this.activeIngredientsRepository.find();
  }

  public async disableLastActiveIngredient(): Promise<UpdateResult> {
    // disable last
    return this.activeIngredientsRepository
      .createQueryBuilder()
      .update()
      .set({
        state: false,
        enabled: false,
      })
      .where('state = :state', { state: true })
      .execute();
    // create new
  }

  private getActiveIngredientsFromDrug(drugResponse: IDrugResponse[]): ActiveIngredient[] {
    const activeIngredients = drugResponse[0].activeIngredients;
    if (activeIngredients) {
      return activeIngredients.map((activeIngredient) => {
        const activeIngredientEntity = new ActiveIngredient();
        activeIngredientEntity.ingredient = activeIngredient.ingredient;
        return activeIngredientEntity;
      });
    }

    return null;
  }

  public async syncActiveIngredient(activeIngredients: IActiveIngredient[], drugSaved: Drug) {
    if (activeIngredients.length > 0) {
      for (const activeIngredient of activeIngredients) {
        let activeIngredientEntity = new ActiveIngredient();
        activeIngredientEntity.ingredient = activeIngredient.ingredient || '';
        activeIngredientEntity.drug = drugSaved;
        activeIngredientEntity = await this.activeIngredientsRepository.save(activeIngredientEntity);
        await this.ingredientTranslationService.syncIngredientTraslations(
          activeIngredient.ingredientTranslations || [],
          activeIngredientEntity,
        );
      }
    }
  }
}
