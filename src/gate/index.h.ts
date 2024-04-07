import type { Event, EventCallable, Store } from 'effector'
import type { ComponentConstructorOptions } from 'svelte'

import type GateComponent from './GateComponent.svelte'

export type GateStateControls = {
  $$stateChanged: EventCallable<any>
  $$statusChanged: EventCallable<boolean>
}

export type GateState<T> = {
  open: Event<void>
  close: Event<void>
  status: Store<boolean>
  state: Store<T | undefined>
} & GateStateControls

export type GateConstructorOptions<T = undefined> = ComponentConstructorOptions<{
  state?: T
}>

export type Gate<T> = SvelteComponentConstructor<
GateComponent,
GateConstructorOptions<T>
> & GateState<T>

export type GateConfig<T> = {
  defaultState?: T | any
  name?: string
}
