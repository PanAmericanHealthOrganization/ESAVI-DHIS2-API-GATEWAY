import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRol } from '../models/userrol.entity';
/**
 *
 */
export class UserRolesService {
  /**
   *
   * @param userRolRepository
   */
  constructor(
    @InjectRepository(UserRol, 'api_gateway')
    private readonly userRolRepository: Repository<UserRol>,
  ) {}

  /**
   *
   * @param user
   * @returns
   */
  async save(user: UserRol): Promise<UserRol> {
    return await this.userRolRepository.save(user);
  }

  /**
   *
   * @param user
   * @returns user
   */
  async delete(user: UserRol): Promise<UserRol> {
    user.enabled = false;
    user.state = false;
    return await this.userRolRepository.save(user);
  }

  /**
   * Retorna los roles de un usuario
   * @param {string} userId Identificador único del usuario
   * @returns {(string|Array)} Lista de roles del usuario
   */
  async getUserRoles(userId: number): Promise<string[]> {
    const userRoles = await this.userRolRepository.find({ where: { user: { id: userId } } });
    let roles: string[] = [];
    roles = userRoles.reduce((prev, current) => {
      return [...prev, current.rol.roleName];
    }, roles);
    return roles;
  }
}
