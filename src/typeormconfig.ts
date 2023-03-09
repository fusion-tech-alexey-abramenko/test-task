import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

const TYPEORM_CONFIG: any = config.get('typeorm');

export const appDataSource = new DataSource({
  cli: {
    migrationsDir: __dirname + '/migration',
  },
  entities: [__dirname + '/entity/*{.js,.ts}'],
  ...TYPEORM_CONFIG,
  migrations: [__dirname + '/migration/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
});
