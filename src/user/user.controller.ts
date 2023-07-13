import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async authUser(@Body() user: UserDto) {
    return this.userService.login(user)
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':name')
  getUser(@Param() params: { name: string }): Promise<User> {
    console.log(`find user request | name: ${params.name}`)
    return this.userService.findOne(params.name)
  }

  @Post('/create')
  createUser(@Body() user: UserDto) {
    console.log(
      `create user request | name: ${user.name}, passwd: ${user.passwd}`
    )
    return this.userService.create(user)
  }
}
