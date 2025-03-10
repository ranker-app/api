import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollService } from './poll.service';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createUserDto: CreatePollDto) {
    createUserDto.userId = req.user.id;
    return this.pollService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Request() req,
    @Body() createUserDto: CreatePollDto,
  ) {
    createUserDto.userId = req.user.id;
    return this.pollService.update(id, createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.pollService.delete(id);
  }
}
