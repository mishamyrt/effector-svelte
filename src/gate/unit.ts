import { createEvent, createStore, type Event, type EventCallable, sample, split, type Store } from 'effector'
import type { ComponentConstructorOptions } from 'svelte'

import GateComponent from './GateComponent.svelte'

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

type GateConstructorOptions<T = undefined> = ComponentConstructorOptions<{
  state?: T
}>

// type GateComponentType = SvelteComponent<EmptyPropsOptions>

// // type SvelteGateComponent = SvelteComponent & {
//   open: Event<void>
//   close: Event<void>
//   status: Store<boolean>
// // }

export type Gate<T> = SvelteComponentConstructor<GateComponent, GateConstructorOptions<T>> & GateState<T>

type GateConfig<T> = {
  defaultState?: T | any
  name?: string
}

export function createGate<T = null> (config?: GateConfig<T>): Gate<T> {
  const prefix = `${config?.name ?? 'gate'}.`
  const defaultState = config?.defaultState ?? null

  const statusChanged = createEvent<boolean>(prefix + 'statusChanged')
  const stateChanged = createEvent<T>(prefix + 'stateChanged')
  const opened = createEvent(prefix + 'open')
  const closed = createEvent(prefix + 'close')

  const $status = createStore(false, { name: prefix + 'status' })
  const $state = createStore<T>(defaultState, { name: prefix + 'state' })

  split({
    source: $status,
    match: {
      open: (isOpen) => isOpen,
      close: (isOpen) => !isOpen
    },
    cases: {
      open: opened,
      close: closed
    }
  })
  sample({
    source: statusChanged,
    target: $status
  })
  sample({
    source: stateChanged,
    target: $state
  })

  class AttachedGate extends GateComponent {
    static open = opened
    static close = closed
    static status = $status
    static state = $state
    static $$stateChanged = stateChanged
    static $$statusChanged = statusChanged

    constructor (options: GateConstructorOptions<T>) {
      super({
        ...options,
        props: {
          ...options.props,
          stateChanged: stateChanged as EventCallable<any>,
          statusChanged
        }
      })
    }
  }
  return AttachedGate
}
