import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SideBar } from '../../../../../src/routes/home/components'

describe('SideBar component', () => {
  test('should render the side bar', () => {
    const handleToggle = vi.fn()
    const user = {
      name: 'Test User'
    }

    render(<SideBar open={true} onToggle={handleToggle} user={user} />)

    const welcomeTest = screen.getByText(/welcome test user/i)
    expect(welcomeTest).toBeInTheDocument()
  })

  test('should not render the side bar', () => {
    const handleToggle = vi.fn()
    const user = {
      name: 'Test User'
    }

    render(<SideBar open={false} onToggle={handleToggle} user={user} />)

    const welcomeTest = screen.queryByText(/welcome test user/i)
    expect(welcomeTest).not.toBeInTheDocument()
  })
})
