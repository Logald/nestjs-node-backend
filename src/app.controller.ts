import { Controller } from '@nestjs/common';
import { TurnsProvider } from './turns/turns.service';
import { UsersProvider } from './users/users.service';

@Controller()
export class AppController {
  constructor (
    private readonly usersService: UsersProvider,
    private readonly turnsService: TurnsProvider
  ) {
    this.usersService.createUserAdminIfNotExist();
    this.turnsService.createTurnsIfNotExists();
  }
}
