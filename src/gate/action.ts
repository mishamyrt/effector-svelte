import type { Gate } from './index.h'

export function gate<T = null> (_: HTMLElement, target: Gate<T>) {
  // TODO: add state handling
  target.$$statusChanged(true)
  return {
    destroy () {
      target.$$statusChanged(false)
    },
  }
}
