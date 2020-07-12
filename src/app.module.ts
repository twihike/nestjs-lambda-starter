import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';
import { TypeOrmOptionsService } from './typeorm/typeorm-options.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmOptionsService,
    }),
    UsersModule,
  ],
})
export class AppModule {}
