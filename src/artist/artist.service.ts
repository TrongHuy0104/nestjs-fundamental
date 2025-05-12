import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>,
  ) {}
  async findArtist(userId: number) {
    const artist = await this.artistRepo.findOneBy({ user: { id: userId } });
    if (!artist) {
      console.log(`Artist with user ID ${userId} not found`);
    }
    return artist;
  }
}
