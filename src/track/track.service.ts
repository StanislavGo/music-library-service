import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TRACKS_DB } from './track.database';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll(): TrackEntity[] {
    return TRACKS_DB;
  }

  findOne(id: string): TrackEntity | undefined {
    return TRACKS_DB.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
