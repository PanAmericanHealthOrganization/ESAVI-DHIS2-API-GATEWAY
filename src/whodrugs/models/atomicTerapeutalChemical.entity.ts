import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Drug } from './drug.entity';

/**
 *
 */
@Entity({
  schema: 'who_drug',
  name: 'atomic_therapeutic_chemicals',
  comment: 'Elementos terapeuticos atómicos',
})
export class AnatomicalTherapeuticChemical extends CustomBaseEntity {
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
  @Column({ name: 'code', comment: 'Código el elemento' })
  code: string;

  /**
   *
   */
  @Column({ name: 'text' })
  text: string;

  /**
   *
   */
  @Column({ name: 'officialFlag' })
  officialFlag: string;

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
}

export class AnatomicalTherapeuticChemicalBuilder {
  private anatomicalTherapeuticChemical: AnatomicalTherapeuticChemical;

  constructor() {
    this.anatomicalTherapeuticChemical = new AnatomicalTherapeuticChemical();
  }
  public withId(id: string): AnatomicalTherapeuticChemicalBuilder {
    this.anatomicalTherapeuticChemical.id = id;
    return this;
  }

  public withCode(code: string): AnatomicalTherapeuticChemicalBuilder {
    this.anatomicalTherapeuticChemical.code = code;
    return this;
  }

  public withText(text: string): AnatomicalTherapeuticChemicalBuilder {
    this.anatomicalTherapeuticChemical.text = text;
    return this;
  }

  public withOfficialFlag(
    officialFlag: string,
  ): AnatomicalTherapeuticChemicalBuilder {
    this.anatomicalTherapeuticChemical.officialFlag = officialFlag;
    return this;
  }

  public withDrug(drug: Drug): AnatomicalTherapeuticChemicalBuilder {
    this.anatomicalTherapeuticChemical.drug = drug;
    return this;
  }

  public build(): AnatomicalTherapeuticChemical {
    return this.anatomicalTherapeuticChemical;
  }
}
