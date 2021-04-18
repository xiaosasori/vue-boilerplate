import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerBaseComponents, loadPlugins } from '@/helpers'
import './styles/index.css'

export const app = createApp(App)

/**
 * Specify plugins to load from the /plugins directory
 * Pass file names without any extension like so
 *
 * @example
 *
 * loadPlugins(['vue-fontawesome'])
 */
loadPlugins(['vue-toastification'])

/**
 * Automatically imports and registers base components
 * Make sure you have at least one Base components in components/base directory
 */
registerBaseComponents(app)

app.use(store).use(router).mount('#app')
