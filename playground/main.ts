import { attachLogger } from 'effector-logger'

import App from './App.svelte'

attachLogger()

const target = document.getElementById('app')
if (!target) {
  throw new Error('#app node is not found')
}
const app = new App({ target })

export default app
