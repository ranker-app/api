import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreatePollCategoryDto } from './dto/create-poll-category.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { Poll } from './interfaces/poll.interface';
import { PollEntity } from './poll.entity';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollEntity)
    private pollsRepository: Repository<PollEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Poll[]> {
    return this.pollsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async setupUser(poll: Poll, userId: number) {
    poll.user = await this.userService.findOneOrThrow(userId);
  }

  async setupCategories(poll: Poll, categories: CreatePollCategoryDto[]) {
    const categoryIds = categories.map((c) => c.id);
    poll.categories = await this.categoryService.findByIds(categoryIds);
  }

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const newPoll: Poll = this.pollsRepository.create(createPollDto);

    await this.setupUser(newPoll, createPollDto.userId);
    await this.setupCategories(newPoll, createPollDto.categories);

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
