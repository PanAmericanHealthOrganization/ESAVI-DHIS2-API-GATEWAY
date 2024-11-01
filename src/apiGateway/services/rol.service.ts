import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../models/rol.entity';
/**
 *
 * Servicio de rol
 *
 */
export class RolService {
  constructor(
    @InjectRepository(Rol, 'api_gateway')
    private readonly rolRepository: Repository<Rol>,
  ) {}

  /**
   * Guardar rol
   * @param {User} user
   * @returns {Promise<User>} descripcion
   */
  async save(user: Rol): Promise<Rol> {
    return await this.rolRepository.save(user);
  }

  /**
   *
   * @param rol
   * @returns rol
   */
  async delete(rol: Rol): Promise<Rol> {
    rol.enabled = false;
    rol.state = false;
    return await this.rolRepository.save(rol);
  }

  /**
   *
   */
  async getRoles(): Promise<Rol[]> {
    return await this.rolRepository.find();
  }
}
