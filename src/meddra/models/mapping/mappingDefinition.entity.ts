import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'mapping_definition',
  comment: 'Definición y descripción del Mapeo',
})
export class MappingDefinition extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryColumn({ name: 'id' })
  id: string;

  /**
   *
   */
  @Column({ name: 'mpd_description', comment: '' })
  description: string;
  /**
   *
   */
  @Column({ name: 'mpd_source', comment: '' })
  source: string;

  /**
   *
   */
  @Column({ name: 'mpd_description_source', comment: '' })
  descriptionSource: string;

  /**
   *
   */
  @Column({ name: 'mpd_target', comment: '' })
  target: string;
  /**
   *
   */
  @Column({ name: 'mpd_description_target', comment: '' })
  descriptionTarget: string;
}
