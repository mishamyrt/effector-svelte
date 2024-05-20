# ☄️ Effector Svelte [![Quality Assurance](https://github.com/mishamyrt/effector-svelte/actions/workflows/qa.yaml/badge.svg)](https://github.com/mishamyrt/effector-svelte/actions/workflows/qa.yaml)

Svelte bindings for effector.

## Installation

```sh
pnpm add effector-svelte
```

## Modules

### Gate

Gate replicates [the implementation from effector-react](https://effector.dev/en/api/effector-react/gate/). Provides the `createGate` function.

#### `createGate`

```ts
import { createGate } from 'effector-svelte'

const Gate = createGate()
```

The function can take as a parameter a name or a configuration object.

```ts
const NamedGate = createGate('name')
const IndexGate = createGate({
  name: 'index',
  defaultValue: -1
})
```

The return result of the `createGate` function will be a constructor of `Gate` type.

#### `Gate`

`Gate` is a Svelte component constructor with additional fields:

- `.open` - `Event<void>` fired upon gate mounting.
- `.close` - `Event<void>` fired upon gate unmounting.
- `.state` - `Store<T>` containing the current state of the gate. This state derives from `state` prop when rendering the gate as a component.
- `.status` - `Store<boolean>` indicating whether the gate is mounted.

#### Component usage

Wrap your component in a Gate component. When the gate is rendered, its state properties will change.

```svelte
<script lang="ts">
  import { StatusGate } from './stores'
</script>

<StatusGate>
  <slot />
</StatusGate>
```

#### Actions usage

Add a `use:gate` action element to the HTML and pass the gate as a parameter to it.

```svelte
<script lang="ts">
  import { gate } from 'effector-svelte'
  import { StatusGate } from './stores'
</script>

<div use:gate={StatusGate}>
  <slot />
</div>
```