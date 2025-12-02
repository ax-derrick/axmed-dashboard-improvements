import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/axmed-dashboard-improvements/',
  plugins: [react()],
});
