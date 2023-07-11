import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './dto/user.dto'
import { genSaltSync, getSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(name: string): Promise<User> {
    return this.userRepository.findOneBy({ name })
  }

  async create({ name, passwd }: UserDto) {
    const salt = await genSaltSync(10)
    const hashed = await hash(passwd, salt)
    await this.userRepository.save({ name, passwd: hashed, isHave: false})

    return { message: 'create user request successfully', status: 200 }
  }
}