import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsAscii, IsEmail, MinLength } from 'class-validator';

import { User } from '../users.entity';

export class UserCreate implements Partial<User> {
  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiProperty()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
