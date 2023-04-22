import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AbsencesModule } from './absences/absences.module';
import { GmpsModule } from './gmps/gmps.module';
import { GroupsModule } from './groups/groups.module';
import { MattersModule } from './matters/matters.module';
import { MGModule } from './mgs/mgs.module';
import { ProffessorsModule } from './proffessors/proffessors.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { TurnsModule } from './turns/turns.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { UsersProvider } from './users/users.service';
import { TurnsProvider } from './turns/turns.service';
import { Turn } from './turns/turn.entity';
import { User } from './users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MattersModule,
    TurnsModule,
    GroupsModule,
    ProffessorsModule,
    SpecialtiesModule,
    MGModule,
    GmpsModule,
    AbsencesModule,
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
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      debug: true,
      // buildSchemaOptions: { dateScalarMode: "isoDate" },
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    TypeOrmModule.forFeature([Turn, User]),
    JwtModule.register({})
  ],
  controllers: [AppController],
  providers: [UsersProvider, TurnsProvider]
})
export class AppModule { }
