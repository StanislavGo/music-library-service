import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    if (this.artistService.findOne(id) === undefined) {
      throw new NotFoundException("Artist with such ID does not exist")
    }
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string, 
  @Body() updateArtistDto: UpdateArtistDto) {
    if (this.artistService.findOne(id) === undefined) {
      throw new NotFoundException("Artist with such ID does not exist")
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.artistService.remove(id);
  }
}
