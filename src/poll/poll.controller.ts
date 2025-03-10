import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get()
  async findAll() {
    return this.pollService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.pollService.findOneOrThrow(id);
  }

  @Post()
  async create(@Body() createUserDto: CreatePollDto) {
    return this.pollService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createUserDto: CreatePollDto) {
    return this.pollService.update(id, createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.pollService.delete(id);
  }
}
