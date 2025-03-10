import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollEntity } from './poll.entity';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PollEntity]), UserModule],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
