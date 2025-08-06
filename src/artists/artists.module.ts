import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artist } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ArtistsModule {}
