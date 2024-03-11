import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TRACKS_DB } from './track.database';
import { TrackEntity } from './entities/track.entity';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const id = v4();
    const newTrack = {
      id,
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    TRACKS_DB.push(newTrack)
    return newTrack;
  }

  findAll(): TrackEntity[] {
    return TRACKS_DB;
  }

  findOne(id: string): TrackEntity | undefined {
    return TRACKS_DB.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const currentTrack = this.findOne(id);
    const currentTrackId = TRACKS_DB.indexOf(currentTrack); 
    TRACKS_DB[currentTrackId].name = updateTrackDto.name;
    TRACKS_DB[currentTrackId].duration = updateTrackDto.duration;
    TRACKS_DB[currentTrackId].artistId = updateTrackDto.artistId;
    TRACKS_DB[currentTrackId].albumId = updateTrackDto.albumId;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
