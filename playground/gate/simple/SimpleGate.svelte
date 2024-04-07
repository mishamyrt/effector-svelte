<script lang="ts">
  import { gate } from '../../../src/gate/action'
  import { SimpleGate, statusLabelStore } from './store'

  let renderMethod = 'none'

  $: statusValue = $statusLabelStore
</script>

<h1>Simple Gate</h1>

<div class="state">
  <div class="row">
    <div class="title">Status:</div>
    <div class="value">{statusValue}</div>
  </div>
  <div class="row">
    <div class="title">Method:</div>
    <div class="value">
      <select bind:value={renderMethod}>
        <option value="none">None</option>
        <option value="component">Component</option>
        <option value="action">Action</option>
      </select>
    </div>
  </div>
</div>

<div class="usecase">
  {#if renderMethod === 'none'}
  <h3>Gate is not rendered</h3>
  {:else if renderMethod === 'component'}
  <SimpleGate>
    <h3>Component gate is rendered</h3>
  </SimpleGate>
  {:else if renderMethod === 'action'}
  <div use:gate={SimpleGate}>
    <h3>Action gate is rendered</h3>
  </div>
  {/if}
</div>

<style lang="scss">
  .state {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
</style>
