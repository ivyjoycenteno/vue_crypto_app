import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import { resolve, dirname } from 'node:path'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd(), '')}
  return defineConfig({
    define: {
      'process.env': env
    },
    plugins: [
      vue(),
      vueI18n({
        /* options */
        // locale messages resourece pre-compile option
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
        // include: path.resolve(__dirname, './src/locales/**')
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      watch: {
          usePolling: true
      },
    },
    test: {
      globals: true
    }
  })
}
