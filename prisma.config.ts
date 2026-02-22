import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
   
    seed: 'npx tsx --env-file=.env prisma/seed.ts',
  },
});