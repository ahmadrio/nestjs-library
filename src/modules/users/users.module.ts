import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
