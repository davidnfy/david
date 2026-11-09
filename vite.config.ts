import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, transformWithEsbuild} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          });
        },
      },
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) return 'three';
            if (id.includes('node_modules/ogl')) return 'ogl';
            if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion-engine';
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
              return 'framer';
            }
            if (id.includes('node_modules/animejs')) return 'anime';
          },
        },
      },
    },
  };
});
