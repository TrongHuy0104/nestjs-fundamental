import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayListDto } from 'src/dto/create-playlist.dto';
import { Playlist } from 'src/entity/playlist.entity';
import { Song } from 'src/entity/songs.entity';
import { User } from 'src/entity/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepo: Repository<Song>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto) {
    const playList = new Playlist();
    playList.name = playListDTO.name;
    // songs will be the array of IDs that we are getting from the DTO object
    const songs = await this.songsRepo.findBy({ id: In(playListDTO.songs) });
    //Set the relation for the songs with the playlist entity
    playList.songs = songs;

    // A user will be the ID of the user we are getting from the request
    //When we implemented the user authentication this id will become the logged
    // in user id
    const user = await this.userRepo.findOneBy({ id: playListDTO.user });

    if (!user) {
      throw new Error('User not found');
    }
    playList.user = user;
    return this.playlistRepo.save(playList);
  }
}
