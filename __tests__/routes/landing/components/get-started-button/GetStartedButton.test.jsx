import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GetStartedButton } from '../../../../../src/routes/landing/components'

describe('GetStartedButton component', () => {
    test('renders button portion', () => {
        render(
            <GetStartedButton />
        )
        
        const GetStartedButtonText = screen.getByText(/GET STARTED/i)
        expect(GetStartedButtonText).toBeInTheDocument()
    })
    
    test('renders login text portion', () => {
        render(
            <GetStartedButton />
        )

        const loginText = screen.getByText(/LOGIN/i)
        expect(loginText).toBeInTheDocument()
    })
})