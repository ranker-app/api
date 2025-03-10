import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollEntity } from './poll.entity';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollEntity]),
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
