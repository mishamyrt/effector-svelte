import { fork } from 'effector'
import { describe, expect, it } from 'vitest'

import { createGate } from '../createGate'

describe('createGate', () => {
  it('creates gate component', async () => {
    const Gate = createGate()
    expect(Gate).toBeDefined()
  })

  it('creates gate component with name', async () => {
    const Gate = createGate('test')
    expect(Gate.status.shortName).toEqual('test.status')
    expect(Gate.state.shortName).toEqual('test.state')
  })

  it('creates gate component with name in config', async () => {
    const Gate = createGate({
      name: 'test',
    })
    expect(Gate.status.shortName).toEqual('test.status')
    expect(Gate.state.shortName).toEqual('test.state')
  })

  it('creates gate component with default state', async () => {
    const scope = fork()
    const Gate = createGate({
      defaultState: 'test',
    })
    expect(scope.getState(Gate.state)).toBe('test')
  })
})
