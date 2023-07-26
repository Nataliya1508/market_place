import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<any> {
    console.log('createUserDto', createUserDto);
    return await this.userService.createUser(createUserDto);
  }
}
