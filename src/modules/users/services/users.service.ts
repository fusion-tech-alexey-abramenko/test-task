import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { DataSource } from 'typeorm';
import { User } from '../../../entity/User';
import { encryptPassword } from '../../../helpers';
import { CreateUserRequest } from '../dto/request/create-user.request';
import { GetUsersResponse } from '../dto/response/get-users.response';

const PASSWORD_SALT: string = config.get('user_password_salt');

@Injectable()
export class UsersService {
  constructor(public readonly connection: DataSource) {}

  public async createUser(dto: CreateUserRequest): Promise<void> {
    const { email, password, firstName, lastName } = dto;

    const hashedPassword = encryptPassword(password, PASSWORD_SALT);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await this.connection.createEntityManager().save(newUser);
  }

  public async getUsers(): Promise<GetUsersResponse> {
    const users = await this.connection
      .createEntityManager()
      .createQueryBuilder(User, 'users')
      .getMany();

    return {
      users: users.map((item) => ({
        id: item.id,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
      })),
    };
  }
}
