<script lang="ts">
  import { gate } from '../action'
  import type { Gate } from '../index.h'
  import TestChild from './TestChild.svelte'

  export let testGate: Gate<any>

  const status = testGate.status
</script>

<span data-testid="status">{$status}</span>
<div use:gate={testGate}>
  <TestChild />
</div>
