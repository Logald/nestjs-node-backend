import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { Repository } from 'typeorm';
import { Gmp } from './gmp.entity';

@Injectable()
export class GmpsProvider {
  constructor(
    @InjectRepository(Gmp) private gmpsService: Repository<Gmp>,
    @InjectRepository(Matter) private mattersService: Repository<Matter>,
    @InjectRepository(Group) private groupsService: Repository<Group>,
    @InjectRepository(Proffessor)
    private proffessorsService: Repository<Proffessor>,
  ) {}

  async getGmps() {
    return await this.gmpsService.find();
  }

  async getGmpsWithRelations() {
    return await this.gmpsService.find({
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmp(gmpId: number) {
    const gmpFound = await this.gmpsService.findOne({ where: { id: gmpId } });
    if (!gmpFound)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async createGmp(gmpData: Omit<Gmp, 'id'>) {
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
        },
      });
      if (gmpFound) return new HttpException('Gmp found', HttpStatus.FOUND);
    }
    const tempGmp = this.gmpsService.create(gmpData);
    return await this.gmpsService.save(tempGmp);
  }
}
