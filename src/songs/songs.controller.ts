import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { HttpExceptionFilter } from 'src/common/middleware/logger/http-exception.filter';
import { CreateSongDto } from 'src/dto/create-songs.dto';
import { UpdateSongDto } from 'src/dto/update-songs.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}
  @Post()
  create(@Body() createSongsDTO: CreateSongDto) {
    return this.songsService.create(createSongsDTO);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ) {
    try {
      return this.songsService.paginate({ page, limit });
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(id: number) {
    return this.songsService.delete(id);
  }
}
