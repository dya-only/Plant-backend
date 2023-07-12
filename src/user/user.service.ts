import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './dto/user.dto'
import { compare, genSaltSync, hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    await this.userRepository.save({ name, passwd: hashed, isHave: false })

    return { message: 'create user request successfully', status: 200 }
  }

  async login({ name, passwd }: UserDto) {
    if (!name || !passwd) return { message: 'invalid user name', status: 401 }

    const data = await this.userRepository.findOneBy({ name })
    if (!data) return { message: 'not found user name', status: 401 }

    const comparedPW = await compare(passwd, data.passwd)
    if (!comparedPW) return { message: 'invalid password', status: 401 }

    const accessToken = jwt.sign({ name, isHave: data.isHave }, 'AllTheThingsIWonder', { expiresIn: '3d' })
    return { accessToken , status: 200 }
  }
}