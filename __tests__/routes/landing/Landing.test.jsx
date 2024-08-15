import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Landing } from '../../../src/routes/landing/Landing'

describe('Landing page', () => {
    test('should render landing page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Landing />
            </MemoryRouter>
        )

        const landingTitle = screen.getByRole('heading', { name: /Project Hercules/i })
        expect(landingTitle).toBeInTheDocument()
    })
    
    test('should render previous user prompt', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Landing />
            </MemoryRouter>
        )

        const previousUserPrompt = screen.getByText('ALREADY HAVE AN ACCOUNT?')
        expect(previousUserPrompt).toBeInTheDocument()
    })
})