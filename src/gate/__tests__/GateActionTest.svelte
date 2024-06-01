<script lang="ts">
  import { gate } from '../action'
  import type { Gate } from '../index.h'

  export let gateComponent: Gate<any>
  export let renderGate: boolean = true

  const status = gateComponent.status
</script>

<span data-testid="status">{$status}</span>
{#if renderGate}
  <div use:gate={gateComponent}>
    <ul data-testid="children">
      <li>Child</li>
      <li>Child</li>
    </ul>
  </div>
{/if}
