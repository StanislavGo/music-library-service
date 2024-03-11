import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    if (this.albumService.findOne(id) === undefined) {
      throw new NotFoundException("user with such id does not exist");
    };
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string, 
  @Body() updateAlbumDto: UpdateAlbumDto) {
    if (this.albumService.findOne(id) === undefined) {
      throw new NotFoundException("user with such id does not exist");
    };
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.albumService.remove(id);
  }
}
