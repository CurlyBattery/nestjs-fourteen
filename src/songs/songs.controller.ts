import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSongDto: UpdateSongDto) {}

  @Delete(':id')
  remove(@Param('id') id: number) {}
}
