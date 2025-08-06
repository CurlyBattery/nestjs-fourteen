import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  artists: number[];

  @IsNotEmpty()
  @IsDateString()
  releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  duration: Date;

  @IsString()
  @IsOptional()
  lyrics?: string;
}
