import type { Event, EventCallable, Store } from 'effector'
import type { ComponentConstructorOptions } from 'svelte'

import type GateComponent from './GateComponent.svelte'

export const emptyState = {}

export type EmptyState = typeof emptyState

export type GateStateControls = {
  $$stateChanged: EventCallable<any>
  $$statusChanged: EventCallable<boolean>
}

export type GateState<T> = {
  open: Event<void>
  close: Event<void>
  status: Store<boolean>
  state: Store<T>
} & GateStateControls

export type GateConstructorOptions<T = EmptyState> = ComponentConstructorOptions<{
  state?: T
}>

export type Gate<T> = SvelteComponentConstructor<
GateComponent,
GateConstructorOptions<T>
> & GateState<T>

export type StrictGateConfig<T = EmptyState> = {
  defaultState: T
  name: string
}

export type GateConfig<T = EmptyState> = Partial<StrictGateConfig<T>>

export type GateConfigOrName<T> = GateConfig<T> | string
