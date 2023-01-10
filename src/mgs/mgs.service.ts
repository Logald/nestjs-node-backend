import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Group } from 'src/groups/group.entity'
import { GroupsProvider } from 'src/groups/groups.service'
import { Matter } from 'src/matters/matter.entity'
import { MattersProvider } from 'src/matters/matters.service'
import { isEmpty } from 'src/utils/empty_object.utils'
import { mgFoundError, mgNotFoundError } from 'src/utils/errors.utils'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateMgDto } from './dtos/create_mg.dto'
import { FindMgDto } from './dtos/find_mg.dto'
import { UpdateMgDto } from './dtos/update_mg.dto'
import { MG } from './mg.entity'

@Injectable()
export class MGProvider {
  constructor (
    @InjectRepository(MG) private readonly mgService: Repository<MG>,
    @InjectRepository(Matter) private readonly matterService: Repository<Matter>,
    @InjectRepository(Group) private readonly groupService: Repository<Group>,
    private readonly matterProvider: MattersProvider,
    private readonly groupProvider: GroupsProvider
  ) {}

  async getMgs (mgsFindManyOptions: FindMgDto) {
    return await this.mgService.find({ where: mgsFindManyOptions })
  }

  async getMgsWithRelations (mgsFindManyOptions: FindMgDto) {
    return await this.mgService.find({
      where: mgsFindManyOptions,
      relations: ['matter', 'group']
    })
  }

  async findOne (findOneOptions: FindOneOptions<MG>, found: boolean = true) {
    const mgFound = await this.mgService.findOne(findOneOptions)
    if (found && !mgFound) mgNotFoundError()
    else if (!found && mgFound) mgFoundError()
    else return mgFound
  }

  async getMg (mgId: number) {
    return await this.findOne({ where: { id: mgId } })
  }

  async getMgWithRelations (mgId: number) {
    return await this.findOne({
      where: { id: mgId },
      relations: ['matter', 'group']
    })
  }

  async createMg (mgData: CreateMgDto) {
    await this.findOne({ where: { matterId: mgData.matterId, groupId: mgData.groupId } }, false)
    await this.matterProvider.findOne({ where: { id: mgData.matterId } })
    await this.groupProvider.findOne({ where: { id: mgData.groupId } })
    return await this.mgService.insert(mgData)
  }

  async updateMg (mgId: number, mgData: UpdateMgDto) {
    isEmpty(mgData)
    await this.findOne({ where: { id: mgId } })
    if ('matterId' in mgData) await this.matterProvider.findOne({ where: { id: mgData.matterId } })
    if ('groupId' in mgData) await this.groupProvider.findOne({ where: { id: mgData.groupId } })
    return await this.mgService.update(mgId, mgData).catch(() => { mgFoundError() })
  }

  async deleteMg (mgId: number) {
    await this.findOne({ where: { id: mgId } })
    return await this.mgService.delete(mgId)
  }
}
