import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

// Paksa cari file .env di directory yang sama dengan lokasi file ini dijalankan
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  datasource: {
    // Tambahkan "as string" biar Prisma yakin ini bukan undefined
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    seed: 'npx tsx --env-file=.env prisma/seed.ts',
  },
});