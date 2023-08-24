import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'dpg-cjjg5pocfp5c738n3o20-a.frankfurt-postgres.render.com',
  port: 5432,
  username: 'admin',
  password: 'LNKWg3aVQnBxwMXPoR2obTyd5hxphkPS',
  database: 'marketplace_vsha',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // Опция для разрешения самоподписанных сертификатов (для тестовых целей)
  },
  migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
};

export default config;
