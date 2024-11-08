import { DataSource, In, InsertResult, Repository } from 'typeorm';
import { LLT } from '../models/standar/llt.entity';

import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import * as readline from 'readline';
import { SOC } from '../models/standar/soc.entity';
import { MeddraSync } from '../models/standar/meddraSync.entity';
import { PT } from '../models/standar/pt.entity';
import { Logger } from '@nestjs/common';
/**
 * Permite procesar los archivos de meddra
 */
export class MeddraProcessFilesService {
  meddraVersionFilePath = null;
  constructor(
    @InjectRepository(SOC, 'meddra')
    private readonly socRepository: Repository<SOC>,

    @InjectRepository(PT, 'meddra')
    private readonly ptRepository: Repository<PT>,

    @InjectRepository(LLT, 'meddra')
    private readonly lltRepository: Repository<LLT>,

    @InjectRepository(MeddraSync, 'meddra')
    private readonly meddraSuncRepository: Repository<MeddraSync>,

    @InjectDataSource('meddra')
    private dataSource: DataSource,
  ) {
    this.meddraVersionFilePath = '';
  }

  private readonly logger = new Logger(MeddraProcessFilesService.name);
  /**
   * Permite procesar los archivos que están en  una versión de meddra
   * @param version
   */
  async processVersionFiles(version: string, lang: string, description: string): Promise<any> {
    // leer el archjivo del repositio upload_files/meddra*/27/es
    const exist = await this.validarVersion(version, lang);
    if (exist) {
      throw new Error('La versión ya existe en la base de datos');
    }
    // validar que exista el directorio
    const path = join(process.cwd(), 'upload_files', 'meddra', version, lang);
    if (!directoryExists(path)) {
      throw new Error('El directorio no existe');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let socDB = [];
    let ptDB = [];
    let llDB = [];
    try {
      const versionEntity = await this.meddraSuncRepository.save(new MeddraSync(version, lang, description));

      // const llt = await readFileContent(version, lang, 'llt.asc');

      const soc = await readFileContent(version, lang, 'soc.asc');
      socDB = await this.processSOC(soc, versionEntity);

      const ptDataFile = await readFileContent(version, lang, 'pt.asc');
      ptDB = await this.processPT(ptDataFile, socDB);

      const lltDataFile = await readFileContent(version, lang, 'llt.asc');
      llDB = await this.processLLT(lltDataFile, ptDB);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    this.logger.log('Proceso de archivos de meddra finalizado');
    return { soc: socDB, pt: ptDB, llt: llDB };
    /**
     *
     */
  }

  /**
   * Permite procesar los SOC y guardarlos en la base de datos
   * @param soc contenido soc de la base de datos
   * @param meddraSync
   * @returns
   */
  private async processSOC(soc: string[][], meddraSync: MeddraSync): Promise<SOC[]> {
    const lltList = [];
    soc.forEach((line) => {
      const soc = new SOC();
      soc.code = line[0];
      soc.name = line[1];
      soc.abbrev = line[2];
      soc.meddraSync = meddraSync;
      lltList.push(soc);
    });
    const inserted = await this.socRepository.insert(lltList);
    const ids = inserted.identifiers.map((id) => id.id);
    this.logger.log(`Insertados SOC ${lltList.length} de ${lltList.length}`);
    return await this.socRepository.find({ where: [{ id: In(ids) }] });
  }
  /**
   * Permite procesar los PT y guardarlos en la base de datos
   * @param pt
   * @param socs
   * @returns
   */
  private async processPT(pt: string[][], socs: SOC[]): Promise<PT[]> {
    const ptList = [];
    pt.forEach((line) => {
      const pt = new PT();
      pt.code = line[0];
      pt.name = line[1];
      pt.socCode = line[3];
      pt.soc = socs.find((soc) => soc.code === line[3]);
      ptList.push(pt);
    });
    const insertedResultIds = [];
    // procesar de 5000 en 5000
    const chunkSize = 5000;
    for (let i = 0; i < ptList.length; i += chunkSize) {
      // Extraer un "chunk" o trozo de la lista
      const chunkList = ptList.slice(i, i + chunkSize);

      // Procesa el chunk aquí
      const inserted = await this.ptRepository.insert(chunkList);
      const ids = inserted.identifiers.map((id) => id.id);
      this.logger.log(`Insertados PT ${i + chunkSize} de ${ptList.length}`);
      insertedResultIds.concat(ids);
    }
    return this.ptRepository.find({ where: { id: In(insertedResultIds) } });
  }
  /**
   *
   * @param soc
   * @param version
   * @returns
   */
  private async processLLT(socs: string[][], pts: PT[]): Promise<InsertResult[]> {
    const lltList = [];
    socs.forEach((line) => {
      const socs = new LLT();
      socs.code = line[0];
      socs.name = line[1];
      socs.ptCode = line[3];
      socs.pt = pts.find((pt) => pt.code === line[3]);
      lltList.push(socs);
    });
    // procesar de 5000 en 5000
    const batchSize = 5000;
    const insertedResult = [];
    for (let i = 0; i < lltList.length; i += batchSize) {
      const batch = lltList.slice(i, i + batchSize);
      insertedResult.push(await this.lltRepository.insert(batch));
      this.logger.log(`Insertados LLT ${i + batchSize} de ${lltList.length}`);
    }
    return insertedResult;
  }

  /**
   * Permite procesar loa archivos de una versión de cie10meddra
   * @param version
   */
  async processCIE10Meddra(version: string, lang: string): Promise<boolean> {
    console.log(`Procesando CIE10Meddra${version}${lang}`);
    return false;
  }

  async validarVersion(meddraVersion: string, lang: string): Promise<boolean> {
    const versionExist = await this.meddraSuncRepository.findOne({ where: { meddraVersion, lang, enabled: true } });
    return versionExist ? true : false;
  }
}

const readFileContent = async (version: string, lang: string, file: string): Promise<string[][]> => {
  const filePath = join(process.cwd(), 'upload_files', 'meddra', version, lang, file);
  // leer el archivo asc
  const fileStream = fs.createReadStream(filePath, { encoding: 'ascii' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const lines = [];
  for await (const line of rl) {
    const lineContent = line.split('$');
    lines.push(lineContent);
  }
  return lines;
};

export const directoryExists = (path: string): boolean => {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
};
