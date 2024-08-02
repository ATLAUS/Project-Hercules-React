import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SideBar } from '../../../../../src/routes/home/components'
import { MemoryRouter } from 'react-router-dom'

describe('SideBar component', () => {
  test('should render the side bar', () => {
    const handleToggle = vi.fn()
    const user = {
      name: 'Test User'
    }

    render(
      <MemoryRouter>
        <SideBar open={true} onToggle={handleToggle} user={user} />
      </MemoryRouter>
    )

    const welcomeTest = screen.getByText(/welcome test user/i)
    expect(welcomeTest).toBeInTheDocument()
  })

  test('should not render the side bar', () => {
    const handleToggle = vi.fn()
    const user = {
      name: 'Test User'
    }

    render(
      <MemoryRouter>
        <SideBar open={false} onToggle={handleToggle} user={user} />
      </MemoryRouter>
    )

    const welcomeTest = screen.queryByText(/welcome test user/i)
    expect(welcomeTest).not.toBeInTheDocument()
  })

  // TODO: Implement this test.
  // test('should navigate away to the form page', () => {
  // })
})
