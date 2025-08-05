import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  private readonly songs = [];
  constructor() {}

  create(createSongDto: CreateSongDto) {
    this.songs.push(createSongDto);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }

  findOne(id: number) {}

  update(id: number, updateSongDto: UpdateSongDto) {}

  remove(id: number) {}
}
