import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from 'src/songs/dto/create-songs.dto';
import { UpdateSongDto } from 'src/songs/dto/update-songs.dto';
import { Song } from 'src/songs/songs.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  private readonly songs: CreateSongDto[] = [];

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releasedDate = songDto.releasedDate;

    const artists = await this.artistRepository.findByIds(songDto.artists);
    song.artists = artists;

    return await this.songRepository.save(song);
  }

  async findAll() {
    // fetch the songs from the db
    return this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) {
      throw new Error(`Song with ID ${id} not found`);
    }
    return song;
  }

  async delete(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  async update(id: number, recordToUpdate: UpdateSongDto) {
    return await this.songRepository.update(id, recordToUpdate);
  }

  // Without paging
  // async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
  //   return paginate<Song>(this.songRepository, options);
  // }

  // With paging
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
