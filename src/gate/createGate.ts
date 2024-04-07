import { createEvent, createStore, type EventCallable, sample, split } from 'effector'

import GateComponent from './GateComponent.svelte'
import type { Gate, GateConfig, GateConstructorOptions } from './index.h'

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
