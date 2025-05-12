import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from 'src/playlist/dto/create-playlist.dto';
import { Playlist } from './playlist.entity';
@Controller('playlists')
export class PlaylistController {
  constructor(private playListService: PlaylistService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
