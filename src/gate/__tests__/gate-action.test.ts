import { cleanup, render } from '@testing-library/svelte'
import { tick } from 'svelte'
import { afterEach, describe, expect, it } from 'vitest'

import { createGate } from '../createGate'
import GateActionTest from './GateActionTest.svelte'

describe('gate action', () => {
  afterEach(cleanup)

  it('updates status on render', async () => {
    const Gate = createGate()
    const screen = render(GateActionTest, {
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
})
