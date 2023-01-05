import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Group } from 'src/groups/group.entity'
import { Matter } from 'src/matters/matter.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { z } from 'zod'
import { MG } from './mg.entity'
import { CreateMg } from './schemas/create_mg.schema'
import { UpdateMg } from './schemas/update_mg.schema'

@Injectable()
export class MGProvider {
  constructor (
    @InjectRepository(MG) private readonly mgService: Repository<MG>,
    @InjectRepository(Matter) private readonly matterService: Repository<Matter>,
    @InjectRepository(Group) private readonly groupService: Repository<Group>
  ) {}

  async getMgs (mgsFindManyOptions: MG) {
    return await this.mgService.find({ where: mgsFindManyOptions })
  }

  async getMgsWithRelations (mgsFindManyOptions: MG) {
    return await this.mgService.find({
      where: mgsFindManyOptions,
      relations: ['matter', 'group']
    })
  }

  private async findMg (mgFindOneOptions: FindOneOptions) {
    const mgFound = await this.mgService.findOne(mgFindOneOptions)
    if (!mgFound) { throw new HttpException('Mg not found', HttpStatus.NOT_FOUND) }
    return mgFound
  }

  async getMg (mgId: number) {
    return await this.findMg({ where: { id: mgId } })
  }

  async getMgWithRelations (mgId: number) {
    return await this.findMg({
      where: { id: mgId },
      relations: ['matter', 'group']
    })
  }

  async createMg (mgData: z.infer<typeof CreateMg>) {
    const passFormat = CreateMg.safeParse(mgData)
    if (!passFormat.success) { throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE) }
    mgData = passFormat.data
    const mgFound = await this.mgService.findOne({
      where: { matterId: mgData.matterId, groupId: mgData.groupId }
    })
    if (mgFound) throw new HttpException('MG found', HttpStatus.FOUND)
    const matterFound = await this.matterService.findOne({
      where: { id: mgData.matterId }
    })
    if (!matterFound) { throw new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE) }
    const groupFound = await this.groupService.findOne({
      where: { id: mgData.groupId }
    })
    if (!groupFound) { throw new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE) }
    return await this.mgService.insert(mgData)
  }

  async updateMg (mgId: number, mgData: z.infer<typeof UpdateMg>) {
    const passFormat = UpdateMg.safeParse(mgData)
    if (!passFormat.success) { throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE) }
    if (Object.keys(passFormat.data).length == 0) { throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE) }
    mgData = passFormat.data
    if ('matterId' in mgData) {
      const matterFound = await this.matterService.findOne({
        where: { id: mgData.matterId }
      })
      if (!matterFound) { throw new HttpException('Matter not found', HttpStatus.NOT_ACCEPTABLE) }
    }
    if ('groupId' in mgData) {
      const groupFound = await this.groupService.findOne({
        where: { id: mgData.groupId }
      })
      if (!groupFound) { throw new HttpException('Group not found', HttpStatus.NOT_ACCEPTABLE) }
    }
    return await this.mgService
      .update(mgId, mgData)
      .then((updateResult) => {
        if (updateResult.affected == 0) { throw new HttpException('Mg not found', HttpStatus.NOT_FOUND) }
        return updateResult
      })
      .catch(() => {
        throw new HttpException('Mg found', HttpStatus.FOUND)
      })
  }

  async deleteMg (mgId: number) {
    const deleteResult = await this.mgService.delete(mgId)
    if (deleteResult.affected == 0) { throw new HttpException('Mg not found', HttpStatus.NOT_ACCEPTABLE) }
    return deleteResult
  }
}
