import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { PlaylistsModule } from './playlists/playlists.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
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
