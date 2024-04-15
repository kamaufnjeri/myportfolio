import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load environment variables from .env file
const env = dotenv.config();
dotenvExpand.expand(env);

export default defineConfig({
  plugins: [
    react(),
  ],
});
