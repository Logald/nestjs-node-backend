import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { Person } from './person.entity';
import { CreatePeople } from './schemas/create_people.schema';
import { UpdatePeople } from './schemas/update_people.schema';

@Injectable()
export class PeopleProvider {
  constructor(
    @InjectRepository(Person) private peopleService: Repository<Person>,
  ) {}

  async getPeople(findManyOptions: Person) {
    return await this.peopleService.find({ where: findManyOptions });
  }

  async getPerson(personId: number) {
    const personFound = await this.peopleService.findOne({
      where: { id: personId },
    });
    if (!personFound)
      throw new HttpException('Person not found', HttpStatus.NOT_ACCEPTABLE);
    return personFound;
  }

  async createPerson(personData: z.infer<typeof CreatePeople>) {
    const passFormat = CreatePeople.safeParse(personData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    personData = passFormat.data;
    const personCiMatch = await this.peopleService.findOne({
      where: { ci: personData.ci },
    });
    if (personCiMatch)
      throw new HttpException(
        'The ci is already in use',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return await this.peopleService.insert(personData);
  }

  async updatePerson(
    personId: number,
    personData: z.infer<typeof UpdatePeople>,
  ) {
    const passFormat = UpdatePeople.safeParse(personData);
    if (!passFormat.success)
      throw new HttpException('Invalid format', HttpStatus.NOT_ACCEPTABLE);
    if (Object.keys(passFormat.data).length == 0)
      throw new HttpException('Empty object', HttpStatus.NOT_ACCEPTABLE);
    personData = passFormat.data;
    if (personData?.ci) {
      const personFound = await this.peopleService.findOne({
        where: { ci: personData.ci },
      });
      if (personFound)
        throw new HttpException('Person Found', HttpStatus.NOT_ACCEPTABLE);
    }
    const personFound = await this.peopleService.update(personId, personData);
    if (personFound.affected == 0)
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
    return personFound;
  }

  async deletePerson(personId: number) {
    const personFound = await this.peopleService.delete(personId);
    if (personFound.affected == 0)
      throw new HttpException('Person not found', HttpStatus.NOT_ACCEPTABLE);
    return personFound;
  }
}
