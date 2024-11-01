import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

/**
 *
 * Entidad de notificaciones
 */
@Entity({ name: 'gtw_notification', schema: 'api_gateway', comment: 'Entidad de notificaciones' })
export class Notification extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador de la notificación' })
  @Generated('uuid')
  id: string;

  /**
   *
   */
  @Column({ name: 'recivers', type: 'text', comment: 'Lista de correos a los que se enviaron las notificaciones' })
  recivers: string;

  /**
   *
   */
  @Column({ name: 'subject', type: 'text', comment: 'Asunto de la notificación', nullable: true })
  subject: string;

  /**
   *
   */
  @Column({ name: 'message_template', type: 'text', comment: 'Tipo de notificación que fue enviada' })
  messageTemplate: string;
}
