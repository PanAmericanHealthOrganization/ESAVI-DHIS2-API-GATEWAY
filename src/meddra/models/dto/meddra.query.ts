import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export interface IMeddraQueryRequest {
  addlangs: string[];
  bview?: string;
  contains?: boolean;
  filters?: string[];
  hlgt?: boolean;
  hlt?: boolean;
  idiacritical?: boolean;
  kana?: boolean;
  language?: string;
  llt?: boolean;
  pt?: boolean;
  rsview?: string;
  searchterms?: ISearchterm[];
  separator?: number;
  skip?: number;
  smq?: boolean;
  soc?: boolean;
  stype?: number;
  synonym?: boolean;
  take?: number;
  version?: number;
}

export class MeddraQueryRequestDto implements IMeddraQueryRequest {
  @ApiProperty({
    example: 'ES',
    description: 'Lenguaje soportado',
  })
  @IsArray({ message: 'addlangs must be an array' })
  addlangs: string[];

  @ApiProperty({
    example: 'bview',
    description: 'bview soportado',
  })
  @IsString({ message: 'bview must be a string' })
  bview?: string;

  @ApiProperty({
    example: 'contains',
    description: 'bview soportado',
  })
  @IsBoolean({ message: 'contains must be a boolean' })
  contains?: boolean;

  @ApiProperty({
    example: 'filters',
    description: 'bview soportado',
  })
  @IsArray({ message: 'filters must be an array' })
  @IsString({ each: true })
  filters?: string[];

  @ApiProperty({
    example: 'hlgt',
    description: 'bview soportado',
  })
  @IsBoolean({ message: 'hlgt must be a boolean' })
  hlgt?: boolean;

  @ApiProperty({
    example: 'hlt',
    description: 'bview soportado',
  })
  @IsBoolean({ message: 'hlt must be a boolean' })
  hlt?: boolean;

  @ApiProperty({
    example: 'idiacritical',
    description: 'bview soportado',
  })
  @IsBoolean({ message: 'idiacritical must be a boolean' })
  idiacritical?: boolean;

  @IsBoolean({ message: 'kana must be a boolean' })
  kana?: boolean;

  @IsString()
  language?: string;

  @IsBoolean({ message: 'kana must be a boolean' })
  llt?: boolean;

  @IsBoolean({ message: 'kana must be a boolean' })
  pt?: boolean;

  @IsString()
  rsview?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => SearchtermDto)
  searchterms: SearchtermDto[];

  @IsNumber()
  separator?: number;

  @IsNumber()
  skip?: number;

  @IsBoolean()
  smq?: boolean;

  @IsBoolean()
  soc?: boolean;

  @IsNumber()
  stype?: number;

  @IsBoolean()
  synonym?: boolean;

  @IsNumber()
  take?: number;

  @IsNumber()
  version?: number;
}

export interface ISearchterm {
  searchlogic: number;
  searchterm: string;
  searchtype: number;
}

export class SearchtermDto implements ISearchterm {
  @IsNumber()
  searchlogic: number;

  @IsString()
  searchterm: string;

  @IsNumber()
  searchtype: number;
}

export interface IMeddraResponse {
  pcode: number;
  code: number;
  name: string;
  category?: string;
  abbrev?: string;
  level?: string;
  cur?: string;
  jcurrency?: string;
  pt?: boolean;
  rating?: number;
}

export class MeddraResponseDto implements IMeddraResponse {
  @ApiProperty({
    example: 1,
    description: 'Código de la clase de medicamento',
  })
  pcode: number;

  @ApiProperty({
    example: 1,
    description: 'Código de la clase de medicamento',
  })
  code: number;
  name: string;
  category?: string;
  abbrev?: string;
  level?: string;
  cur?: string;
  jcurrency?: string;
  pt?: boolean;
  rating?: number;
}

export interface IMeddraJWTResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface IProcessVersion {
  version: string;
  lang: string;
}

export class ProcessVersionReqDTO implements IProcessVersion {
  @IsNotEmpty({ message: 'El Campo "version", es requerido' })
  //@Matches('^(0[1-9]|[1-9][0-9])_(1|2)$', "No es una versión válida, ejemplo: '22_1,22_2,23_1,23_2'")
  version: string;
  @IsNotEmpty({ message: 'El Campo "lang", del lenguaje es requerido' })
  lang: string;
}
