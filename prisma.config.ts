import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // 👇 GANTI pakai URL Database Neon lo yang panjang itu
    url: "postgresql://neondb_owner:npg_zbkpIqQG9oD6@ep-fragrant-pine-a1mrqcda-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
  migrations: {
    seed: 'npx tsx --env-file=.env prisma/seed.ts',
  },
});