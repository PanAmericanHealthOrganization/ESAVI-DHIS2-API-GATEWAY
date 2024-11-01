import { uuidGenerator } from 'src/whodrugs/utils/utils';
import { ActiveIngredient } from '../activeIngredient.entity';
import { Drug } from '../drug.entity';
import { DrugSync } from '../drugSync.entity';
import {
  IATC,
  IActiveIngredient,
  ICountryOfSale,
  IDrugResponse,
  IIngredientTranslation,
  IMaHolder,
} from '../dtos/drug.dto';
import { IngredientTranslation } from '../ingredientTranslation.entity';
import { CountryOfSale } from '../countryOfSale.entity';
import { Maholder } from '../maholder.entity';
import { AnatomicalTherapeuticChemical } from '../atomicTerapeutalChemical.entity';

export class DrugSchemaAdapter {
  private drug: Drug;
  //1
  private activeIngredients: ActiveIngredient[];
  private ingredientTranslations: IngredientTranslation[];
  //2
  private countryOfSales: CountryOfSale[];
  private maholders: Maholder[];
  //3
  private atcs: AnatomicalTherapeuticChemical[];

  //
  constructor(drug: IDrugResponse, drugSync: DrugSync) {
    this.drug = null;
    //1
    this.activeIngredients = [];
    this.ingredientTranslations = [];
    //2
    this.countryOfSales = [];
    this.maholders = [];
    //3
    this.atcs = [];
    this.buildDrug(drug, drugSync);
  }

  private buildDrug(drug: IDrugResponse, drugSync: DrugSync) {
    this.drug = new Drug();
    this.drug.id = uuidGenerator(11);
    this.drug.drugCode = drug.drugCode;
    this.drug.drugName = drug.drugName;
    this.drug.medicinalProductID = drug.medicinalProductID;
    this.drug.isGeneric = drug.isGeneric;
    this.drug.isPreferred = drug.isPreferred;

    this.drug.drugSync = drugSync;
    // 1
    this.buildActiveIngredients(this.drug, drug.activeIngredients);
    // 2
    this.buildCoutriOfSale(this.drug, drug.countryOfSales);
    // 3
    this.buildATCs(this.drug, drug.atcs);
  }
  //1.a
  private buildActiveIngredients(
    drug: Drug,
    activeIngredient: IActiveIngredient[],
  ) {
    for (const ai of activeIngredient) {
      const activeIngredientEntity = new ActiveIngredient();
      activeIngredientEntity.id = uuidGenerator(11);
      activeIngredientEntity.ingredient = ai.ingredient;
      // FK
      activeIngredientEntity.drug = drug;
      //
      this.activeIngredients.push(activeIngredientEntity);
      //
      this.buildIngredientTraslation(
        activeIngredientEntity,
        ai.ingredientTranslations,
      );
    }
  }
  // 1.B
  private buildIngredientTraslation(
    activeIngredient: ActiveIngredient,
    ingredientTranslation: IIngredientTranslation[],
  ) {
    for (const it of ingredientTranslation || []) {
      const itEntity = new IngredientTranslation();
      itEntity.id = uuidGenerator(11);
      itEntity.languageCode = it.languageCode;
      itEntity.ingredient = it.ingredient;
      // fK
      itEntity.activeIngredient = activeIngredient;
      //
      this.ingredientTranslations.push(itEntity);
    }
  }
  // 2 a
  private buildCoutriOfSale(drug: Drug, countryOfSale: ICountryOfSale[]) {
    for (const cos of countryOfSale) {
      const cosEntity = new CountryOfSale();
      cosEntity.id = uuidGenerator(11);
      cosEntity.medicinalProductID = cos.medicinalProductID;
      cosEntity.iso3Code = cos.iso3Code;

      cosEntity.drug = drug;
      //
      this.countryOfSales.push(cosEntity);
      //
      this.buildMaholder(cosEntity, cos.maHolders);
    }
  }
  // 2 b
  private buildMaholder(cos: CountryOfSale, maholders: IMaHolder[]) {
    for (const mh of maholders) {
      const mhEntity = new Maholder();
      mhEntity.id = uuidGenerator(11);
      mhEntity.name = mh.name;
      mhEntity.medicinalProductID = mh.medicinalProductID;
      mhEntity.countrySale = cos;
      //
      this.maholders.push(mhEntity);
    }
  }

  // 3 a
  private buildATCs(drug: Drug, atcs: IATC[]) {
    for (const atc of atcs) {
      const atcEntity = new AnatomicalTherapeuticChemical();
      atcEntity.id = uuidGenerator(11);
      atcEntity.code = atc.code;
      atcEntity.text = atc.text;
      atcEntity.officialFlag = atc.officialFlag;
      //FK
      atcEntity.drug = drug;

      //
      this.atcs.push(atcEntity);
    }
  }

  public getEntities() {
    return {
      drug: this.drug,
      activeIngredients: this.activeIngredients,
      ingredientTranslations: this.ingredientTranslations,
      countryOfSales: this.countryOfSales,
      maholders: this.maholders,
      atcs: this.atcs,
    };
  }
}
