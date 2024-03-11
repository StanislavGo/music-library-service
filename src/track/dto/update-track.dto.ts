import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  name?: string;
  artistId?: string;
  albumId?: string;
  duration?: number;
}
