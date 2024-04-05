import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    // Unfonts({
    //   custom: {
    //     families: [
    //       {
    //         name: 'Geist',
    //         src: 'assets/fonts/Geist/*.woff',
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
