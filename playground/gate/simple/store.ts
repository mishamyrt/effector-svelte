import { createStore, sample } from 'effector'

import { createGate } from '../../../src/gate/createGate'

export const SimpleGate = createGate()

export const statusLabelStore = createStore('Closed')

export const statusStore = SimpleGate.status

sample({
  clock: SimpleGate.status,
  fn: (status) => status ? 'Open' : 'Closed',
  target: statusLabelStore,
})
