import { cleanup, render } from '@testing-library/svelte'
import { tick } from 'svelte'
import { afterEach, describe, expect, it } from 'vitest'

import { createGate } from '../createGate'
import GateComponentTest from './GateComponentTest.svelte'

describe('Gate component', () => {
  afterEach(cleanup)

  it('renders gate children', async () => {
    const Gate = createGate()
    const screen = render(GateComponentTest, {
      props: {
        gateComponent: Gate,
        renderGate: true,
      },
    })
    await tick()
    const childrenNode = screen.getByTestId('children')
    expect(childrenNode).toBeDefined()
  })

  it('updates status on render', async () => {
    const Gate = createGate()
    const screen = render(GateComponentTest, {
      props: {
        gateComponent: Gate,
        renderGate: false,
      },
    })
    await tick()
    expect(screen.getByTestId('status').innerHTML).toEqual('false')

    screen.rerender({
      renderGate: true,
    })
    await tick()
    expect(screen.getByTestId('status').innerHTML).toEqual('true')
  })

  it('updates state on render', async () => {
    const Gate = createGate<string | null>()
    const screen = render(GateComponentTest, {
      props: {
        gateComponent: Gate,
        stateValue: null,
      },
    })
    await tick()
    expect(screen.getByTestId('state').innerHTML).toEqual('null')

    screen.rerender({
      stateValue: 'test',
    })
    await tick()
    expect(screen.getByTestId('state').innerHTML).toEqual('test')
  })
})
