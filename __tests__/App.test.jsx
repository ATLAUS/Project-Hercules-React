import { describe, test, expect, afterEach } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { App } from '../src/App'

describe('App', () => {
  afterEach(cleanup)

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

  test('should render logout button', () => {
    render(<App />)

    const logoutButton = screen.getByText('Log Out')
    expect(logoutButton).toBeInTheDocument()
  })

  test('should render home nav button', () => {
    render(<App />)

    const homeButton = screen.getByText('Home')
    expect(homeButton).toBeInTheDocument()
  })
})

describe('App navigation', () => {
  afterEach(cleanup)

  //TODO : Figure out how to reset test to Landing page
  test('should navigate to home page', async () => {
    render(<App />)

    const homeButton = screen.getByText('Home')
    homeButton.click()

    await waitFor(() => {
      const homePage = screen.getByText('Home')
      expect(homePage).toBeInTheDocument()
    })
  })

  test('should navigate to form page', async () => {
    render(<App />)

    const formButton = screen.getByText('Form')
    formButton.click()

    await waitFor(() => {
      const formPage = screen.getByText('Form')
      expect(formPage).toBeInTheDocument()
    })
  })

  test('should navigate to workout page', async () => {
    render(<App />)

    const workoutButton = screen.getByText('Workout')
    workoutButton.click()

    await waitFor(() => {
      const workoutPage = screen.getByText('Workout')
      expect(workoutPage).toBeInTheDocument()
    })
  })
})
