import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ALBUMS_DB } from './album.database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
  }

  findAll() {
    return ALBUMS_DB;
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
