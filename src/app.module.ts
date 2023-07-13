import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConfigurationModule } from './configuration/configuration.module'
import { UserModule } from './user/user.module'
import { join } from 'path'
import { PlantModule } from './plant/plant.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_SCHEMA'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get<boolean>('TYPEORM_SYBCHRONIZE'),
      }),
    }),
    ConfigurationModule,
    UserModule,
    UserModule,
    PlantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
