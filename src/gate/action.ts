import type { Gate } from './index.h'

export function gate<T = null> (_: HTMLElement, target: Gate<T>) {
  target.$$statusChanged(true)
  return {
    destroy () {
      target.$$statusChanged(false)
    },
  }
}
