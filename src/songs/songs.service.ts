import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Connection } from '../common/constants/connection';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const newSong = this.songRepository.create(createSongDto);
    return await this.songRepository.save(newSong);
  }

  async findAll() {
    return await this.songRepository.find();
  }

  async findOne(id: number) {
    return this.songRepository.findOneBy({ id });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    return await this.songRepository.update(id, updateSongDto);
  }

  remove(id: number) {
    return this.songRepository.delete(id);
  }
}
