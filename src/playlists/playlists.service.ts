import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { Song } from '../songs/entities/song.entity';
import { User } from '../users/entities/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const songs = await this.songsRepository.findBy({
      id: In(createPlaylistDto.songs),
    });

    const user = await this.usersRepository.findOne({
      where: { id: createPlaylistDto.user },
    });

    const newPlaylist = this.playlistsRepository.create({
      ...createPlaylistDto,
      songs,
      user,
    });

    return this.playlistsRepository.save(newPlaylist);
  }
}
