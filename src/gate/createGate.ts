import { createEvent, createStore, type EventCallable, split } from 'effector'

import { normalizeConfig } from './config'
import GateComponent from './GateComponent.svelte'
import type { EmptyState, Gate, GateConfig, GateConstructorOptions } from './index.h'

export function createGate<T = EmptyState> (configOrName?: GateConfig<T> | string): Gate<T> {
  const { name, defaultState } = normalizeConfig(configOrName)

  const statusChanged = createEvent<boolean>(name + '.statusChanged')
  const stateChanged = createEvent<T>(name + '.stateChanged')
  const opened = createEvent(name + '.open')
  const closed = createEvent(name + '.close')

  const $status = createStore(false, {
    name: name + '.status',
  })
    .on(statusChanged, (_, status) => status)
  const $state = createStore<T>(defaultState, {
    name: name + '.state',
  })
    .on(stateChanged, (_, state) => state)
  split({
    source: $status,
    match: {
      open: (isOpen) => isOpen,
      close: (isOpen) => !isOpen,
    },
    cases: {
      open: opened,
      close: closed,
    },
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
          statusChanged,
        },
      })
    }
  }
  return AttachedGate
}
