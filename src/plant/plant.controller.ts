import {Body, Controller, Get, Header, Param, Post, UseGuards} from '@nestjs/common'
import { PlantService } from './plant.service'
import { PlantDto } from './dto/plant.dto'
import { Plant } from './entities/plant.entity'
import { UserService } from 'src/user/user.service'

@Controller('plant')
export class PlantController {
  constructor(private plantService: PlantService) {}

  @Get()
  getAll(): Promise<Plant[]> {
    return this.plantService.findAll()
  }

  @Get(':name')
  getByName(@Param() params: { name: string }): Promise<Plant> {
    return this.plantService.findOne(params.name)
  }

  @Post()
  createPlant(@Body() plant: PlantDto) {
    console.log(`create plant request | owner: ${plant.owner}`)
    return this.plantService.create(plant)
  }
}
