<script lang="ts">
  import type { EventCallable } from 'effector'
  import { onMount } from 'svelte'

  import { emptyState } from './index.h'

  export let stateChanged: EventCallable<any>
  export let statusChanged: EventCallable<boolean>
  export let state: any = emptyState

  onMount(() => {
    statusChanged(true)
    return () => statusChanged(false)
  })

  $: state !== emptyState && stateChanged(state)
</script>

<slot />
