import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './entity/songs.entity';
import { Artist } from './entity/artist.entity';
import { User } from './entity/user.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { Playlist } from './entity/playlist.entity';

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'huy01040104',
      database: 'postgres',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'songs', method: RequestMethod.GET })
      .forRoutes('songs');
  }

  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
}
