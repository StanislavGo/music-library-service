import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ARTISTS_DB } from './artist.database';
import { ArtistEntity } from './entities/artist.entity';
import { v4 } from 'uuid';
import { TRACKS_DB } from 'src/track/track.database';
import { ALBUMS_DB } from 'src/album/album.database';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const id = v4();

    const newArtist = {
      id,
      name: createArtistDto.name,
      grammy: createArtistDto.grammy
    }

    ARTISTS_DB.push(newArtist);
    return newArtist;
  }

  findAll(): ArtistEntity[] {
    return ARTISTS_DB;
  }

  findOne(id: string): ArtistEntity | undefined {
    return ARTISTS_DB.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const currentArtist = this.findOne(id);
    const indexOfCurrentArtist = ARTISTS_DB.indexOf(currentArtist);
    ARTISTS_DB[indexOfCurrentArtist].name = updateArtistDto.name || ARTISTS_DB[indexOfCurrentArtist].name;
    ARTISTS_DB[indexOfCurrentArtist].grammy = updateArtistDto.grammy || ARTISTS_DB[indexOfCurrentArtist].grammy;

    return ARTISTS_DB[indexOfCurrentArtist];
  }

  remove(id: string) {
    if (this.findOne(id)) {
      const indexOfCurrentArtist = ARTISTS_DB.indexOf(this.findOne(id));
      ARTISTS_DB.splice(indexOfCurrentArtist, 1);

      TRACKS_DB.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        };
      });

      ALBUMS_DB.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        };
      });
    } else {
      throw new NotFoundException("Artist not found");
    }
  }
}
