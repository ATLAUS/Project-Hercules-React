import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../src/App'

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isLoading: false,
  })
}))

//TODO: Test complete user experience.
describe('App', () => {
  test('should render title', () => {
    render(<App />)

    const title = screen.getByText(/Project Hercules/i)
    expect(title).toBeInTheDocument()
  })

  test('should render GET STARTED button', () => {
    render(<App />)

    const loginButton = screen.getByText('GET STARTED')
    expect(loginButton).toBeInTheDocument()
  })

  test('should render clickable LOGIN text', () => {
    render(<App />)

    const clickableText = screen.getByText('LOGIN')
    expect(clickableText).toBeInTheDocument()
  })
})