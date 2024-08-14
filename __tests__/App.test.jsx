import { describe, test, expect, beforeEach, vi } from 'vitest'
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

  test('should render GET STARTED button', () => {
    render(<App />)

    const loginButton = screen.getByText('GET STARTED')
    expect(loginButton).toBeInTheDocument()
  })

  test('should render clickable LOGIN text', () => {
    render(<App />)

    const clickableText = screen.getByText("LOGIN")
    expect(clickableText).toBeInTheDocument()
  })
})

// TODO: need to update these navigation tests.
// describe('App navigation', () => {
//   //TODO : Figure out how to reset test to Landing page.
//   test('should navigate to home page', async () => {
//     render(<App />)

//     const getStartedButton = screen.getByText('GET STARTED')
//     getStartedButton.click()

//     await waitFor(() => {
//       const homePage = screen.getByText('WORKOUTS')
//       expect(homePage).toBeInTheDocument()
//     })
//   })
//})
