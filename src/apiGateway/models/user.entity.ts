import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../apiGateway/models/interfaces/user.interfaces';
import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { UserRol } from './userrol.entity';

/**
 *
 */
@Entity({ name: 'auth_user', schema: 'api_gateway', comment: 'Tabla de usuarios' })
export class User extends CustomBaseEntity implements IUser {
  /**
   *
   */
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador del usuario' })
  id: number;

  /**
   *
   */
  @Column({ name: 'user', unique: true, comment: 'Nombre de usuario' })
  userName: string;

  /**
   *
   */
  @Column({ name: 'email', unique: true, comment: 'Correo del usuario' })
  email: string;

  /**
   *
   */
  @Column({ name: 'password', comment: 'Contraseña del usuario' })
  password: string;

  /**
   *
   */
  @Column({ name: 'last_login', nullable: true, comment: 'Último inicio de sesión' })
  lastLogin: Date;

  /**
   *
   */
  @OneToMany(() => UserRol, (userRol) => userRol.user)
  userRoles: UserRol[];
}
