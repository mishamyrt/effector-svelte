<script lang="ts">
  import type { EventCallable } from 'effector'
  import { onMount } from 'svelte'

  export let stateChanged: EventCallable<any>
  export let statusChanged: EventCallable<boolean>
  export let state: any = null

  onMount(() => {
    statusChanged(true)
    return () => statusChanged(false)
  })

  $: state && stateChanged(state)
</script>

<slot />
