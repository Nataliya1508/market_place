import { UserResponseInterface } from '@app/types/userResponse.interface';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Create user' })
  // @ApiTags('User')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            name: { example: 'Nataly', description: 'userName' },
            email: { example: 'test1@gmail.com', description: 'email' },
            password: { example: 'N3456g5tjnfd', description: 'password' },
            phoneNumber: { example: '0990973689', description: 'phoneNumber' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post()
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);

    return await this.userService.buildUserResponse(user);
  }

  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('login')
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);

    return await this.userService.buildUserResponse(user);
  }
  @ApiOperation({ summary: 'Carrent user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('user')
  @UseGuards(AuthGuard)
  async carrentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserEntity,
  })
  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );

    return this.userService.buildUserResponse(user);
  }
}
// function ApiTags(arg0: string) {
//   throw new Error('Function not implemented.');
// }
