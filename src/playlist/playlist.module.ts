import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/entity/songs.entity';
import { User } from 'src/entity/user.entity';
import { Playlist } from 'src/entity/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
