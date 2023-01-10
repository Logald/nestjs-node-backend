import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'src/utils/empty_object.utils'
import { personFoundError, personNotFoundError } from 'src/utils/errors.utils'
import { FindOneOptions, Repository } from 'typeorm'
import { CreatePeopleDto } from './dtos/create_people.dto'
import { UpdatePeopleDto } from './dtos/update_people.dto'
import { Person } from './person.entity'

@Injectable()
export class PeopleProvider {
  constructor (
    @InjectRepository(Person) private readonly peopleService: Repository<Person>
  ) {}

  async findOne (findOneOptions: FindOneOptions<Person>, found: boolean = true) {
    const personFound = await this.peopleService.findOne(findOneOptions)
    if (found && !personFound) personNotFoundError()
    else if (!found && personFound) personFoundError()
    else return personFound
  }

  async getPeople (findManyOptions: Person) {
    return await this.peopleService.find({ where: findManyOptions })
  }

  async getPerson (personId: number) {
    return await this.findOne({ where: { id: personId } })
  }

  async createPerson (personData: CreatePeopleDto) {
    await this.findOne({ where: { ci: personData.ci } }, false)
    return await this.peopleService.insert(personData)
  }

  async updatePerson (
    personId: number,
    personData: UpdatePeopleDto
  ) {
    isEmpty(personData)
    await this.findOne({ where: { id: personId } })
    if (personData?.ci) await this.findOne({ where: { ci: personData.ci } }, false)
    return await this.peopleService.update(personId, personData)
  }

  async deletePerson (personId: number) {
    await this.findOne({ where: { id: personId } })
    return await this.peopleService.delete(personId)
  }
}
