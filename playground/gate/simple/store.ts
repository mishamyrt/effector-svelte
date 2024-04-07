import { createStore, sample } from 'effector'

import { createGate } from '../../../src/gate/unit'

export const SimpleGate = createGate()

export const statusLabelStore = createStore('Closed')

sample({
  clock: SimpleGate.status,
  fn: (status) => status ? 'Open' : 'Closed',
  target: statusLabelStore
})
