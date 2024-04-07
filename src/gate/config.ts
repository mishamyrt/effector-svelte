import { emptyState, type GateConfig, type GateConfigOrName, type StrictGateConfig } from './index.h'

export function isGateConfig<T> (x: GateConfigOrName<T>): x is GateConfig<T> {
  return typeof x === 'object'
}

export function normalizeConfig<T> (config?: GateConfigOrName<T>): StrictGateConfig<T> {
  if (!config) {
    return {
      name: 'gate',
      defaultState: emptyState as T
    }
  }
  if (isGateConfig(config)) {
    return {
      name: config.name ?? 'gate',
      defaultState: config.defaultState ?? emptyState as T
    }
  }
  return {
    name: config,
    defaultState: emptyState as T
  }
}
