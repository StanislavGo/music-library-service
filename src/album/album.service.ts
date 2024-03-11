import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ALBUMS_DB } from './album.database';
import { v4 } from 'uuid';
import { AlbumEntity } from './entities/album.entity';
import { TRACKS_DB } from 'src/track/track.database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const id = v4();

    const newAlbum = {
      id,
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };

    ALBUMS_DB.push(newAlbum);

    return newAlbum;
  }

  findAll(): AlbumEntity[] {
    return ALBUMS_DB;
  }

  findOne(id: string): AlbumEntity | undefined {
    return ALBUMS_DB.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const currentAlbum = this.findOne(id);
    const indexOfCurrentAlbum = ALBUMS_DB.indexOf(currentAlbum);
    ALBUMS_DB[indexOfCurrentAlbum].name = updateAlbumDto.name;
    ALBUMS_DB[indexOfCurrentAlbum].year = updateAlbumDto.year;
    ALBUMS_DB[indexOfCurrentAlbum].artistId = updateAlbumDto.artistId;

    return ALBUMS_DB[indexOfCurrentAlbum];
  }

  remove(id: string) {
    if (this.findOne(id)) {
      ALBUMS_DB.splice(ALBUMS_DB.indexOf(this.findOne(id)), 1);
      
      for (let i = 0; i < TRACKS_DB.length; i++) {
        if (TRACKS_DB[i].albumId === id) {
          TRACKS_DB[i].albumId = null;
        };
      };
    } else {
      throw new NotFoundException('Album not found');
    }
  }
}
