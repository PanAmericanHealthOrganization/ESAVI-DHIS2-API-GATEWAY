import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export class IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  lastLogin: Date;
}

export class UserDto implements IUser {
  @ApiProperty({ type: String, description: 'User id' })
  id: number;

  @ApiProperty({ type: String, description: 'Nombre del usuario' })
  @Expose()
  userName: string;

  @Expose()
  @IsNotEmpty({ message: 'Email es requerido' })
  @IsEmail(undefined, { message: 'Email no valido' })
  email: string;

  password: string;

  @Expose()
  @IsDate({ message: 'Fecha de inicio de sesion no valida' })
  lastLogin: Date;
}

export class UserRegisterDto {
  @ApiProperty({ type: String, description: 'Nombre del usuario' })
  @Expose()
  userName: string;

  @ApiProperty({ type: String, description: 'Email del usuario' })
  @IsNotEmpty({ message: 'Email es requerido' })
  @IsEmail(undefined, { message: 'Email no valido' })
  email: string;

  @ApiProperty({ type: String, description: 'Contraseña del usuario' })
  @IsNotEmpty({ message: 'Contraseña es requerido' })
  password: string;
}

export class UserBasicDto {
  @Expose()
  id: number;

  @Expose()
  userName: string;

  @Expose()
  email: string;
}

export class LoginCredentialsDto {
  @ApiProperty({ type: String, description: 'Usuario o Correo electrónico' })
  @IsNotEmpty({ message: 'Usuario o Correo es requerido' })
  userName: string;

  @ApiProperty({ type: String, description: 'Contraseña' })
  @IsNotEmpty({ message: 'Contraseña es requerido' })
  password: string;
}

export class LogginJWT {
  token: string;
  user: string;
  email: string;
}
