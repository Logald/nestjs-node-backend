import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MG } from 'src/mgs/mg.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { Gmp } from './gmp.entity';
import { CreateGmp } from './schemas/create_gmp.schema';
import { UpdateGmp } from './schemas/update_gmp.schema';

@Injectable()
export class GmpsProvider {
  constructor(
    @InjectRepository(Gmp) private gmpsService: Repository<Gmp>,
    @InjectRepository(MG) private mgService: Repository<MG>,
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
  ) {}

  async getGmps(findManyOptions: Gmp) {
    return await this.gmpsService.find({ where: findManyOptions });
  }

  async getGmpsWithRelations(findManyOptions: Gmp) {
    return await this.gmpsService.find({
      where: findManyOptions,
      relations: ['mg', 'proffessor'],
    });
  }

  async getGmp(gmpId: number) {
    const gmpFound = await this.gmpsService.findOne({ where: { id: gmpId } });
    if (!gmpFound)
      throw new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async getGmpWithRelations(gmpId: number) {
    const gmpFound = await this.gmpsService.findOne({
      where: { id: gmpId },
      relations: ['mg', 'proffessor'],
    });
    if (!gmpFound)
      throw new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async createGmp(gmpData: z.infer<typeof CreateGmp>) {
    const passFormat = CreateGmp.safeParse(gmpData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    gmpData = passFormat.data;
    const mgFound = await this.mgService.findOne({
      where: { id: gmpData.mgId },
    });
    if (!mgFound)
      throw new HttpException('MG not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: gmpData.proffessorId },
    });
    if (!proffessorFound)
      throw new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const gmpFound = await this.gmpsService.findOne({
      where: [
        {
          mgId: gmpData.mgId,
          proffessorId: gmpData.proffessorId,
        },
        { mgId: gmpData.mgId, active: true },
      ],
    });
    if (gmpFound) throw new HttpException('GMP found', HttpStatus.FOUND);
    return await this.gmpsService.insert(gmpData);
  }

  async updateGmp(gmpId: number, gmpData: z.infer<typeof UpdateGmp>) {
    const passFormat = UpdateGmp.safeParse(gmpData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    gmpData = passFormat.data;
    if ('mgId' in gmpData) {
      const mgFound = await this.mgService.findOne({
        where: { id: gmpData.mgId },
      });
      if (!mgFound)
        throw new HttpException('MG not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('proffessorId' in gmpData) {
      const proffessorFound = await this.proffessorsService.findOne({
        where: { id: gmpData.proffessorId },
      });
      if (!proffessorFound)
        throw new HttpException(
          'Proffessor not found',
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    return await this.gmpsService
      .update({ id: gmpId }, gmpData)
      .then((updateResult) => {
        if (updateResult.affected == 0)
          throw new HttpException('GMP not found', HttpStatus.NOT_FOUND);
        return updateResult;
      })
      .catch(() => new HttpException('GMP found', HttpStatus.FOUND));
  }

  async deleteGmp(gmpId: number) {
    const gmpFound = await this.gmpsService.delete(gmpId);
    if (gmpFound.affected == 0)
      throw new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }
}
