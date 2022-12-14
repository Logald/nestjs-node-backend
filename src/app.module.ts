import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AbsencesModule } from './absences/absences.module'
import { GmpsModule } from './gmps/gmps.module'
import { GroupsModule } from './groups/groups.module'
import { MattersModule } from './matters/matters.module'
import { MGModule } from './mgs/mgs.module'
import { PeopleModule } from './people/people.module'
import { ProffessorsModule } from './proffessors/proffessors.module'
import { ProfilesModule } from './profiles/profiles.module'
import { SpecialitiesModule } from './specialities/specialities.module'
import { TurnsModule } from './turns/turns.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MattersModule,
    TurnsModule,
    GroupsModule,
    PeopleModule,
    ProffessorsModule,
    SpecialitiesModule,
    MGModule,
    GmpsModule,
    AbsencesModule,
    ProfilesModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'prueba',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV == 'development'
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
