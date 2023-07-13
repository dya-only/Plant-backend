import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './dto/user.dto'
import { compare, genSaltSync, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

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
    if (await this.userRepository.findOneBy({ name }))
      return { message: 'already existed', status: 401 }

    const salt = await genSaltSync(10)
    const hashed = await hash(passwd, salt)
    await this.userRepository.save({ name, passwd: hashed, isHave: false })

    return { message: 'create user request successfully', status: 200 }
  }

  async login(user: UserDto) {
    if (!user || !user.name || !user.passwd)
      return { message: 'invalid user name', status: 401 }

    const data = await this.userRepository.findOneBy({ name: user.name })
    if (!data) return { message: 'not found user name', status: 401 }

    const comparedPW = await compare(user.passwd, data.passwd)
    if (!comparedPW) return { message: 'invalid password', status: 401 }

    const accessToken = sign(
      { name: user.name, isHave: data.isHave },
      'secretKey',
      { expiresIn: '7d' }
    )
    return { name: user.name, accessToken, status: 200 }
  }
}
