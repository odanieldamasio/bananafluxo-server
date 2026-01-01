// src/database/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'kontavo',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'kontavo_db',

  // Entidades
  entities: ['src/**/*.entity{.ts,.js}'],

  // Migrations
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',

  // Configurações
  synchronize: false, // IMPORTANTE: false para usar migrations
  logging: process.env.NODE_ENV === 'development',
});
