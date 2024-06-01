<script lang="ts">
  import type { Gate } from '../index.h'

  export let gateComponent: Gate<any>
  export let renderGate: boolean = true
  export let stateValue: any = null

  const status = gateComponent.status
  const state = gateComponent.state
</script>

<span data-testid="status">{$status}</span>
<span data-testid="state">{$state}</span>
{#if renderGate}
  <svelte:component this={gateComponent} state={stateValue}>
    <ul data-testid="children">
      <li>Child</li>
      <li>Child</li>
    </ul>
  </svelte:component>
{/if}
