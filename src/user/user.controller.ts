import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':name')
  getUser(@Param() name: string): Promise<User> {
    return this.userService.findOne(name)
  }

  @Post()
  createUser(@Body() user: UserDto) {
    console.log(`create user request | name: ${user.name}, passwd: ${user.passwd}`)
    return this.userService.create(user)
  }
}