import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../../src/routes'

// TODO: Stub the useAuth0 hook to show a user.

describe('Home page component', () => {
  test('should render home page', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Home />
      </MemoryRouter>
    )

    const homeText = screen.getByText(/Home/i)
    expect(homeText).toBeInTheDocument()
  })
})
