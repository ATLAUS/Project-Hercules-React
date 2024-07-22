import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../../src/routes'

// TODO: Stub the useAuth0 hook to show a user.
describe('Home page component with a user defined', () => {
  vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
      user: {
        picture: 'https://example.com/profile-picture.png'
      }
    })
  }))

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render home page', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Home />
      </MemoryRouter>
    )

    const homeText = screen.getByText(/Workouts/i)
    expect(homeText).toBeInTheDocument()
  })

  test('should render profile picture', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
