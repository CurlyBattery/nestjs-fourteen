import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  artists: string[];

  @IsNotEmpty()
  @IsDateString()
  releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  duration: Date;
}
