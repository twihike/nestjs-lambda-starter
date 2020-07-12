import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsEmail, IsNumber, MinLength } from 'class-validator';

import { User } from '../users.entity';

export class UserUpdate implements Partial<User> {
  @ApiProperty()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiProperty()
  @IsAscii()
  @MinLength(8)
  readonly password: string;

  @ApiProperty()
  @IsNumber()
  readonly version: number;
}
