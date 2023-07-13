import { Module } from '@nestjs/common'
import { PlantController } from './plant.controller'
import { PlantService } from './plant.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plant } from './entities/plant.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Plant])],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}
