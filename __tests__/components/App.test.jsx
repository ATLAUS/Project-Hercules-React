import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../../src/App'

describe('App', () => {
  test('should render', () => {
    render(<App />)

    const title = screen.getByText(/Project Hercules/i)
    // Either of these tests will work.
    // expect(title).toBeVisible()
    expect(title).toBeInTheDocument()
  })
})
