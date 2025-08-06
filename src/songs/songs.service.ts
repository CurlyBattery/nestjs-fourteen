import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const artists = await this.artistsRepository.findBy({
      id: In(createSongDto.artists),
    });
    const newSong = this.songsRepository.create({ ...createSongDto, artists });

    return await this.songsRepository.save(newSong);
  }

  async findAll() {
    return await this.songsRepository.find();
  }

  async findOne(id: number) {
    return this.songsRepository.findOneBy({ id });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    let artists;
    if (updateSongDto.artists) {
      artists = await this.songsRepository.findBy({
        id: In(updateSongDto.artists),
      });
    } else {
      const song = await this.songsRepository.findOne({ where: { id } });
      artists = song.artists;
    }
    console.log(artists);

    return await this.songsRepository.update(id, { ...updateSongDto, artists });
  }

  remove(id: number) {
    return this.songsRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
