import { Controller, Get, Post, Body, Param, Delete, NotFoundException, ParseUUIDPipe, HttpCode, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    if (this.trackService.findOne(id) === undefined) {
      throw new NotFoundException("track with such id does not exist");
    };
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string, 
  @Body() updateTrackDto: UpdateTrackDto) {
    if (this.trackService.findOne(id) === undefined) {
      throw new NotFoundException("track with such id does not exist");
    };
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.trackService.remove(id);
  }
}
