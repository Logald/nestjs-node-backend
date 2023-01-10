import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PeopleProvider } from 'src/people/people.service'
import { Person } from 'src/people/person.entity'
import { isEmpty } from 'src/utils/empty_object.utils'
import { proffessorFoundError, proffessorNotFoundError } from 'src/utils/errors.utils'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateProffessorDto } from './dtos/create_proffessor.dto'
import { FindProffessorDto } from './dtos/find_proffessor.dto'
import { UpdateProffessorDto } from './dtos/update_proffessor.dto'
import { Proffessor } from './proffessor.entity'

@Injectable()
export class ProffessorsProvider {
  constructor (
    @InjectRepository(Proffessor)
    private readonly proffessorsService: Repository<Proffessor>,
    @InjectRepository(Person) private readonly peopleService: Repository<Person>,
    private readonly peopleProvider: PeopleProvider
  ) {}

  async getProffessors (findManyOptions: FindProffessorDto) {
    return await this.proffessorsService.find({ where: findManyOptions })
  }

  async getProffessorsWithRelations (findManyOptions: FindProffessorDto) {
    return await this.proffessorsService.find({
      where: findManyOptions,
      relations: ['person']
    })
  }

  async findOne (findOneOptions: FindOneOptions<Proffessor>, found: boolean = true) {
    const proffessorFound = await this.proffessorsService.findOne(findOneOptions)
    if (found && !proffessorFound) proffessorNotFoundError()
    else if (!found && proffessorFound) proffessorFoundError()
    else return proffessorFound
  }

  async getProffessor (proffessorId: number) {
    return await this.findOne({ where: { id: proffessorId } })
  }

  async getProffessorWithRelations (proffessorId: number) {
    return await this.findOne({
      where: { id: proffessorId },
      relations: ['person']
    })
  }

  async createProffessor (proffessorData: CreateProffessorDto) {
    await this.peopleService.findOne({ where: { id: proffessorData.personId } })
    await this.findOne({ where: { personId: proffessorData.personId } }, false)
    return await this.proffessorsService.insert(proffessorData)
  }

  async updateProffessor (
    proffessorId: number,
    proffessorData: UpdateProffessorDto
  ) {
    isEmpty(proffessorData)
    await this.peopleProvider.findOne({ where: { id: proffessorData.personId } })
    await this.findOne({ where: { id: proffessorId } })
    return await this.proffessorsService.update(proffessorId, proffessorData)
  }

  async deleteProffessor (proffessorId: number) {
    await this.findOne({ where: { id: proffessorId } })
    return await this.proffessorsService.delete(proffessorId)
  }
}
