import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/sequelize.config';
import { User } from './users/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [
    UsersModule,
    // AuthModule,
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      models: [User],
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    ProfileModule,
  ],
})
export class AppModule {}
