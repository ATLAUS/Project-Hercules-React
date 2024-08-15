import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { GetStartedButton } from '../../../../../src/routes/landing/components'
import { useAuth0 } from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react')

describe('GetStartedButton component', () => {
    beforeEach(() => {
        useAuth0.mockReturnValue({
            loginWithRedirect: vi.fn()
        })
    })

    afterEach(() => {
        useAuth0.mockReset()
    })

    test('renders button portion', () => {
        render(<GetStartedButton />)
        
        const GetStartedButtonText = screen.getByText(/GET STARTED/i)
        expect(GetStartedButtonText).toBeInTheDocument()
    })
    
    test('renders login text portion', () => {
        render(<GetStartedButton />)

        const loginText = screen.getByText(/LOGIN/i)
        expect(loginText).toBeInTheDocument()
    })

    test('allows user to log in', async () => {
        const { loginWithRedirect } = useAuth0()
        
        render(<GetStartedButton />)
        const getStartedButton = screen.getByText(/GET STARTED/i)
        getStartedButton.click()

        await waitFor(() => {
            expect(loginWithRedirect).toHaveBeenCalled(1)
        })

    })
})