import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LogginJWT, UserRegisterDto } from '../models/interfaces/user.interfaces';
import { User } from '../models/user.entity';
import { JwtService } from '@nestjs/jwt';
/**
 * Servicio de autenticación
 */
@Injectable()
export class AuthService {
  /**
   * Constructor
   * @param userRepository
   * @param jwtService
   */
  constructor(
    @InjectRepository(User, 'api_gateway')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Mecanismo de autenticación, verifica el usuario y la contrasenya
   * @param userNameOrEmail nombre o correo electrónico del usuari
   * @param pass
   * @returns JWT
   */
  async login(userNameOrEmail: string, pass: string): Promise<LogginJWT> {
    const user = await this.userRepository.findOne({
      where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });
    if (!user) {
      throw new BadRequestException('El usuario o contraseña no valido');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new BadRequestException('El usuario o contraseña no valido');
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      user: user.userName,
      email: user.userName,
    };
  }

  /**
   * Registra un nuevo usuario en la base de datos
   * @param registrerDto
   * @returns
   */
  async register(registrerDto: UserRegisterDto): Promise<User> {
    const exist = await this.findUser(registrerDto.userName, registrerDto.email);
    if (exist) {
      throw new BadRequestException('El usuario o correo ya existen');
    }
    // encript password
    const hashPass = await bcrypt.hash(registrerDto.password, 10);
    registrerDto.password = hashPass;
    //
    return this.userRepository.save(registrerDto);
  }

  /**
   * Busca un usuario por su nombre o correo
   * @param userName
   * @returns
   */
  async findUser(userName: string, email: string): Promise<boolean> {
    return this.userRepository.exists({
      where: [{ userName }, { email }],
    });
  }
}
