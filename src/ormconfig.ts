import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'dpg-cifijounqql1s38qi9p0-a',
  port: 5432,
  username: 'nataly',
  password: 'FR3FJ85RRqqOfdfwKXmVuCkRm0kdhMqw',
  database: 'marketplace_3vsq',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
};

export default config;
