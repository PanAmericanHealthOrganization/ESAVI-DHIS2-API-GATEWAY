import { BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 *
 */
export enum CRUD {
  C,
  R,
  U,
  D,
}
/**
 * Interface de definición para los campos base de identidad de los registros
 */
export interface IBaseEntity {
  enabled: boolean;
  state: boolean;
  action: CRUD;
  createdAt: Date;
  updatedAt: Date;
  actionBy: string;
}
export abstract class CustomBaseEntity implements IBaseEntity {
  /**
   *
   */
  @BeforeUpdate()
  private beforeUpdate() {
    this.action = CRUD.U;
    this.updatedAt = new Date();
  }

  /**
   *
   */
  @Column({
    name: 'audit_enabled',
    default: true,
    comment: 'Registro habilitado para la cunsulta',
  })
  public enabled: boolean;

  /**
   *
   */
  @Column({
    name: 'audit_state',
    default: true,
    comment: 'Eliminado lógico, 1 activo, 0 eliminado',
  })
  public state: boolean;

  /**
   *
   */
  @Column({
    name: 'audit_action',
    type: 'enum',
    enum: CRUD,
    default: CRUD.C,
    comment: 'Última accion CRUD realizada sobre el registro',
  })
  public action: CRUD;

  /**
   *
   */
  @CreateDateColumn({
    name: 'audit_created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  public createdAt: Date;

  /**
   *
   */
  @UpdateDateColumn({
    name: 'audit_updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualización del registro',
  })
  public updatedAt: Date;

  /**
   *
   */
  @Column({
    name: 'audit_action_by',
    comment: 'Identificación del usuario o proceso que realiza la acción',
    nullable: true,
  })
  public actionBy: string;
}

export const generateFromEntries = <K extends PropertyKey>(...keys: K[]) => {
  return Object.fromEntries(keys.map((k) => [k, ''])) as { [P in K]: string };
};
