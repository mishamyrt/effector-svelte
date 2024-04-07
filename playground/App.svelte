<script lang="ts">
  // import { gate } from '../src/gate/action'
  import './styles.css'

  import { Route, Router } from 'svelte-routing'

  import SimpleGate from './gate/simple/SimpleGate.svelte'
  import Playground from './Playground.svelte'

  export let url = ''
</script>

<div class="app-root">
  <Router {url}>
    <div class="app-content">
      <Route path="/gate/simple" component={SimpleGate} />
      <Route path="/"><Playground /></Route>
    </div>
  </Router>
</div>

<style lang="scss">
  .app-root {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .app-content {
    max-width: 700px;
    width: 100%;
  }
</style>
