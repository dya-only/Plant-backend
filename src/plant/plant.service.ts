import { Injectable } from '@nestjs/common'
import { Plant } from './entities/plant.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PlantDto } from './dto/plant.dto'

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>
  ) {}

  findAll(): Promise<Plant[]> {
    return this.plantRepository.find()
  }

  findOne(name: string): Promise<Plant> {
    return this.plantRepository.findOneBy({ owner: name })
  }

  async create({ date, owner, type, status }: PlantDto) {
    await this.plantRepository.save({ 
      date, owner, type, status,
      degree: 0, humidity: 0, earth: 0, leaf: 0, predict: 0
    })

    return { message: 'create plant request successfully', status: 200 }
  }
}