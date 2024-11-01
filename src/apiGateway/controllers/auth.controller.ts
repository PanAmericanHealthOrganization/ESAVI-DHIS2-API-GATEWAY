import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogginJWT, LoginCredentialsDto, UserRegisterDto } from '../models/interfaces/user.interfaces';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.entity';
/**
 *
 */
@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);
  /**
   *
   * @param credentials
   * @returns
   */
  @Post('/login')
  public login(@Body() credentials: LoginCredentialsDto): Promise<LogginJWT> {
    try {
      const { userName, password } = credentials;
      return this.authService.login(userName, password);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param registrerDto
   * @returns
   */
  @Post('/register')
  public async register(@Body() registrerDto: UserRegisterDto): Promise<User> {
    try {
      return await this.authService.register(registrerDto);
    } catch (error) {
      throw error;
    } finally {
    }
  }
}
