import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Matter } from 'src/matters/matter.entity';
import { Proffessor } from 'src/proffessors/proffessor.entity';
import { IsNull, Not, Repository } from 'typeorm';
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

  async getGmpsWithGroupId(groupId: number) {
    const groupFound = await this.groupsService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.gmpsService.find({ where: { groupId } });
  }

  async getGmpsWithGroupIdAndRelations(groupId: number) {
    const groupFound = await this.groupsService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.gmpsService.find({
      where: { groupId },
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmpsWithProffessorId(proffessorId: number) {
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.gmpsService.find({ where: { proffessorId } });
  }

  async getGmpsWithProffessorIdAndRelations(proffessorId: number) {
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.gmpsService.find({
      where: { proffessorId },
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmpsWithGroupIdAndProffessorId(
    groupId: number,
    proffessorId: number,
  ) {
    const groupFound = await this.groupsService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.gmpsService.find({ where: { groupId, proffessorId } });
  }

  async getGmpsWithGroupIdProffessorIdAndRelations(
    groupId: number,
    proffessorId: number,
  ) {
    const groupFound = await this.groupsService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.gmpsService.find({
      where: { groupId, proffessorId },
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmpsWithProffessors() {
    return await this.gmpsService.find({
      where: { proffessorId: Not(IsNull()) },
    });
  }

  async getGmpsWithProffessorsAndRelations() {
    return await this.gmpsService.find({
      where: { proffessorId: Not(IsNull()) },
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmpsWithoutProffessors() {
    return await this.gmpsService.find({ where: { proffessorId: IsNull() } });
  }

  async getGmpsWithoutProffessorsAndRelations() {
    return await this.gmpsService.find({
      where: { proffessorId: IsNull() },
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmpsWithMatterId(matterId: number) {
    const matterFound = await this.mattersService.findOne({
      where: { id: matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.gmpsService.find({ where: { matterId } });
  }

  async getGmpWithMatterIdAndGroupId(matterId: number, groupId: number) {
    const matterFound = await this.mattersService.findOne({
      where: { id: matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const groupFound = await this.groupsService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    const gmpFound = await this.gmpsService.findOne({
      where: { matterId, groupId },
    });
    if (!gmpFound)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async getGmpWithMatterIdGroupIdAndRelations(
    matterId: number,
    groupId: number,
  ) {
    const matterFound = await this.mattersService.findOne({
      where: { id: matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const groupFound = await this.groupsService.findOne({
      where: { id: groupId },
    });
    if (!groupFound)
      return new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE);
    const gmpFound = await this.gmpsService.findOne({
      where: { matterId, groupId },
      relations: ['matter', 'group', 'proffessor'],
    });
    if (!gmpFound)
      return new HttpException('Gmp not found', HttpStatus.NOT_FOUND);
    return gmpFound;
  }

  async getGmpsWithMatterIdAndProffessorId(
    matterId: number,
    proffessorId: number,
  ) {
    const matterFound = await this.mattersService.findOne({
      where: { id: matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.gmpsService.find({
      where: { matterId, proffessorId },
    });
  }

  async getGmpsWithMatterIdProffessorIdAndRelations(
    matterId: number,
    proffessorId: number,
  ) {
    const matterFound = await this.mattersService.findOne({
      where: { id: matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    const proffessorFound = await this.proffessorsService.findOne({
      where: { id: proffessorId },
    });
    if (!proffessorFound)
      return new HttpException(
        'Proffessor not found',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.gmpsService.find({
      where: { matterId, proffessorId },
      relations: ['matter', 'group', 'proffessor'],
    });
  }

  async getGmpsWithMatterIdAndRelations(matterId: number) {
    const matterFound = await this.mattersService.findOne({
      where: { id: matterId },
    });
    if (!matterFound)
      return new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE);
    return await this.gmpsService.find({
      where: { matterId },
      relations: ['matter', 'group', 'proffessor'],
    });
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

  async getGmpWithRelations(gmpId: number) {
    const gmpFound = await this.gmpsService.findOne({
      where: { id: gmpId },
      relations: ['matter', 'group', 'proffessor'],
    });
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

  async updateGmp(
    gmpId: number,
    gmpData: Omit<Gmp, 'id' | 'matter' | 'group' | 'proffessor'>,
  ) {
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
    const gmpFound = await this.gmpsService.update(gmpId, gmpData);
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
