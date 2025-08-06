import { Song } from '../../songs/entities/song.entity';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  songs: number[];

  @IsNumber()
  @IsNotEmpty()
  user: number;
}
