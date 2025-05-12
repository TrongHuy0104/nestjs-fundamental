import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';

@Module({
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [TypeOrmModule.forFeature([Artist])],
})
export class ArtistModule {}
