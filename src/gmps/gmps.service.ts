import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
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
    @InjectRepository(Matter) private mattersService: Repository<Matter>,
    @InjectRepository(Group) private groupsService: Repository<Group>,
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
  ) {}

  async getGmps(findManyOptions: Gmp) {
    return await this.gmpsService.find({ where: findManyOptions });
  }

  async getGmpsWithRelations(findManyOptions: Gmp) {
    return await this.gmpsService.find({
      where: findManyOptions,
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmp(gmpId: number) {
    const gmpFound = await this.gmpsService.findOne({ where: { id: gmpId } });
    if (!gmpFound)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async getGmpWithRelations(gmpId: number) {
    const gmpFound = await this.gmpsService.findOne({
      where: { id: gmpId },
      relations: ['matter', 'group', 'proffessor'],
    });
    if (!gmpFound)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async createGmp(gmpData: z.infer<typeof CreateGmp>) {
    const passFormat = CreateGmp.safeParse(gmpData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    gmpData = passFormat.data;
    if ('matterId' in gmpData) {
      const matterFound = await this.mattersService.findOne({
        where: { id: gmpData.matterId },
      });
      if (!matterFound)
        return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('groupId' in gmpData) {
      const groupFound = await this.groupsService.findOne({
        where: { id: gmpData.groupId },
      });
      if (!groupFound)
        return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('proffessorId' in gmpData) {
      const proffessorFound = await this.proffessorsService.findOne({
        where: { id: gmpData.proffessorId },
      });
      if (!proffessorFound)
        return new HttpException(
          'Proffessor not found',
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    const gmpFound = await this.gmpsService.findOne({
      where: {
        matterId: gmpData.matterId,
        groupId: gmpData.groupId,
        active: true,
      },
    });
    if (gmpFound) return new HttpException('Gmp found', HttpStatus.FOUND);
    return await this.gmpsService.insert(gmpData);
  }

  async updateGmp(gmpId: number, gmpData: z.infer<typeof UpdateGmp>) {
    const passFormat = CreateGmp.safeParse(gmpData);
    if (!passFormat.success)
      return new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      return new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    gmpData = passFormat.data;
    if ('matterId' in gmpData) {
      const matterFound = await this.mattersService.findOne({
        where: { id: gmpData.matterId },
      });
      if (!matterFound)
        return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('groupId' in gmpData) {
      const groupFound = await this.groupsService.findOne({
        where: { id: gmpData.groupId },
      });
      if (!groupFound)
        return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    }
    if ('proffessorId' in gmpData) {
      const proffessorFound = await this.proffessorsService.findOne({
        where: { id: gmpData.proffessorId },
      });
      if (!proffessorFound)
        return new HttpException(
          'Proffessor not found',
          HttpStatus.NOT_ACCEPTABLE,
        );
    }
    if ('matterId' in gmpData && 'groupId' in gmpData) {
      const gmpFound = await this.gmpsService.findOne({
        where: {
          matterId: gmpData.matterId,
          groupId: gmpData.groupId,
          active: true,
        },
      });
      if (gmpFound) return new HttpException('Gmp found', HttpStatus.FOUND);
    }
    const gmpFound = await this.gmpsService.update({ id: gmpId }, gmpData);
    if (gmpFound.affected == 0)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async deleteGmp(gmpId: number) {
    const gmpFound = await this.gmpsService.delete(gmpId);
    if (gmpFound.affected == 0)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }
}
