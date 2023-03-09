import { Module } from '@nestjs/common';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';

const TYPEORM_CONFIG: any = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_CONFIG,
      cli: {
        migrationsDir: __dirname + '/migration',
      },
      entities: [__dirname + '/entity/*{.js,.ts}'],
      migrations: [__dirname + '/migration/*{.js,.ts}'],
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
