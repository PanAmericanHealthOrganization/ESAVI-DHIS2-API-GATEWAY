import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Rol } from './rol.entity';
/**
 *
 */
@Entity({ name: 'auth_user_rol', schema: 'api_gateway', comment: 'Tabla de roles de usuario' })
export class UserRol extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (userRol) => userRol.userRoles)
  user: User;

  @ManyToOne(() => Rol, (userRol) => userRol.userRoles)
  rol: Rol;

  @Column({ type: 'timestamp', nullable: true })
  since: Date;

  @Column({ type: 'timestamp', nullable: true })
  until: Date;
}
