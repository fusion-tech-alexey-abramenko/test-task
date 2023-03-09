import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly firstName: string;

  @ApiProperty()
  public readonly lastName: string;
}

export class GetUsersResponse {
  @ApiProperty({
    isArray: true,
    type: UserDto,
  })
  public readonly users: UserDto[];
}
