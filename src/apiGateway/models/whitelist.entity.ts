import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 *
 */
@Entity({ name: 'gtw_white_list_cors', schema: 'api_gateway', comment: 'Lista blanca de CORS' })
export class WhiteListCors extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identificador único de la tabla',
  })
  id: number;

  /**
   *
   */
  @Column({
    name: 'url_client',
    comment: 'Dirección URL del cliente ',
    nullable: false,
  })
  url: string;

  /**
   *
   */
  @Column({ name: 'description', comment: 'Descripción del host' })
  description: string;

  /**
   *
   */
  @Column({
    name: 'since',
    comment: 'Fecha desde la que está habilitado el acceso',
    nullable: false,
  })
  from: Date;

  /**
   *
   */
  @Column({
    name: 'until',
    comment: 'Fecha hasta la que está habilitado el acceso ',
    nullable: true,
  })
  until: Date;
}
