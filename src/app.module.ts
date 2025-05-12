import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/songs.entity';
import { User } from './user/user.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist/artist.entity';
import { Playlist } from './playlist/playlist.entity';

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
    UserModule,
    AuthModule,
    ArtistModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .exclude({ path: 'songs', method: RequestMethod.GET })
  //     .forRoutes('songs');
  // }
  // constructor(private dataSource: DataSource) {
  //   console.log(dataSource.driver.database);
  // }
}
