import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollEntity } from './poll.entity';
import { Poll } from './interfaces/poll.interface';
import { UserService } from '../user/user.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollEntity)
    private pollsRepository: Repository<PollEntity>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Poll[]> {
    return this.pollsRepository.find();
  }

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const newPoll: Poll = this.pollsRepository.create(createPollDto);

    const defaultUser = await this.userService.findOneOrThrow(1);

    newPoll.user = defaultUser;

    return this.pollsRepository.save(newPoll);
  }

  async findOneOrThrow(id: number): Promise<Poll> {
    const poll = await this.pollsRepository.findOneBy({ id });

    if (!poll) {
      throw new HttpException('Poll not found', HttpStatus.NOT_FOUND);
    }

    return poll;
  }

  async update(id: number, createPollDto: CreatePollDto): Promise<Poll> {
    const poll = await this.findOneOrThrow(id);

    Object.assign(poll, createPollDto);

    return await this.pollsRepository.save(poll);
  }

  async delete(id: number): Promise<any> {
    await this.findOneOrThrow(id);

    return await this.pollsRepository.delete(id);
  }
}
