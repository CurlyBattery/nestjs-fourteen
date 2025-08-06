import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  findArtist(userId: number): Promise<Artist> {
    return this.artistsRepository.findOneBy({ user: { id: userId } });
  }
}
