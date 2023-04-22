import { Controller, Injectable } from "@nestjs/common";
import { UsersProvider } from "./users/users.service";
import { TurnsProvider } from "./turns/turns.service";

@Controller()
export class AppController {
  constructor(
    private usersService: UsersProvider,
    private turnsService: TurnsProvider
  ) {
    this.usersService.createUserAdminIfNotExist();
    this.turnsService.createTurnsIfNotExists();
  }
}