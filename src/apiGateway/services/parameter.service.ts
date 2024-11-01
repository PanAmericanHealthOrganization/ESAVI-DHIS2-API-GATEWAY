import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Parameter } from '../models/parameter.entity';
import { InjectRepository } from '@nestjs/typeorm';
/**
 *
 */
@Injectable()
export class ParameterService {
  //
  constructor(
    @InjectRepository(Parameter, 'api_gateway')
    private readonly parameterRepository: Repository<Parameter>,
  ) {}
  /**
   *
   * @param id
   * @returns
   */
  public getParameterById(id: number): Promise<Parameter | null> {
    return this.parameterRepository.findOne({ where: { id: id } });
  }
}
