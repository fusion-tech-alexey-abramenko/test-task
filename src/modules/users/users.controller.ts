import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/request/create-user.request';
import { GetUsersResponse } from './dto/response/get-users.response';
import { UsersService } from './services/users.service';

@ApiTags('users module')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'create user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async craeteUser(@Body() dto: CreateUserRequest): Promise<void> {
    return this.usersService.createUser(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'get users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUsersResponse,
  })
  async getUsers(): Promise<GetUsersResponse> {
    return this.usersService.getUsers();
  }
}
