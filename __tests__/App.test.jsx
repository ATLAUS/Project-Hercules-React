import { describe, test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { App } from '../src/App'

describe('App', () => {
  test('should render title', () => {
    render(<App />)

    const title = screen.getByText(/Project Hercules/i)
    // Either of these tests will work.
    // expect(title).toBeVisible()
    expect(title).toBeInTheDocument()
  })

  test('should render login button', () => {
    render(<App />)

    const loginButton = screen.getByText('Log In')
    expect(loginButton).toBeInTheDocument()
  })

  test('should render home nav button', () => {
    render(<App />)

    const homeButton = screen.getByText('Home')
    expect(homeButton).toBeInTheDocument()
  })
})

// TODO: need to update these navigation tests.
describe('App navigation', () => {
  //TODO : Figure out how to reset test to Landing page.
  test('should navigate to home page', async () => {
    render(<App />)

    const homeButton = screen.getByText('Home')
    homeButton.click()

    await waitFor(() => {
      const homePage = screen.getByText('Home')
      expect(homePage).toBeInTheDocument()
    })
  })
})
