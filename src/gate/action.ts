import type { Gate } from './index.h'

export function gate<T = null> (_: HTMLElement, gate: Gate<T>) {
  gate.$$statusChanged(true)
  return {
    destroy () {
      gate.$$statusChanged(false)
    }
  }
}
