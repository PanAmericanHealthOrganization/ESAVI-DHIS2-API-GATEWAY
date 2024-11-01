// generar una tabla de rol en typeorm

import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRol } from './userrol.entity';
/**
 *
 */
@Entity({ name: 'auth_rol', schema: 'api_gateway', comment: 'Roles de usuarios' })
export class Rol extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   *
   */
  @Column({ name: 'rol_name', unique: true, comment: 'Nombre del rol' })
  roleName: string;

  /**
   *
   */
  @Column({ name: 'description', length: 500, comment: 'Descripción del rol' })
  description: string;

  /**
   *
   */
  @OneToMany(() => UserRol, (userRol) => userRol.user)
  userRoles: UserRol[];
}
