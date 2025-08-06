import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/dev-config.service.provider';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PlaylistsModule } from './playlists/playlists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlists/entities/playlist.entity';
import { Song } from './songs/entities/song.entity';
import { DataSource } from 'typeorm';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    SongsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'mydb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ArtistsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: async () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('dbName:', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST });

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
