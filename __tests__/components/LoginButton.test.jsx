import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { LoginButton } from '../../src/shared/components'
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react')

describe('LoginButton Component', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      loginWithRedirect: vi.fn()
    })
  })

  afterEach(() => {
    useAuth0.mockReset()
  })

  test('should redirect to login page', async () => {
    const { loginWithRedirect } = useAuth0()

    render(<LoginButton />)
    const loginButton = screen.getByText('Log In')
    loginButton.click()

    await waitFor(() => {
      expect(loginWithRedirect).toHaveBeenCalled(1)
    })
  })
})
