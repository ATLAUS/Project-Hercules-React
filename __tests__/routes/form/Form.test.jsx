import { describe, test, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Form } from '../../../src/routes'
import { fetchNewGeminiWorkout } from '../../../src/services/GeminiService'

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      name: 'Chravis',
      picture: 'https://example.com/profile-picture.png'
    },
    getAccessTokenSilently: vi.fn().mockResolvedValue('fakeAccessToken')
  })
}))

vi.mock('../../../src/services/GeminiService', () => ({
  fetchNewGeminiWorkout: vi.fn()
}))

describe('Form page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render form page', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <Form />
      </MemoryRouter>
    )

    const formText = screen.getByRole('heading', { name: /Create Workout/i })
    expect(formText).toBeInTheDocument()
  })

  test('should render toggle buttons', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <Form />
      </MemoryRouter>
    )

    // Level buttons
    const beginnerButton = screen.getByLabelText('beginner')
    const intermediateButton = screen.getByLabelText('intermediate')
    const advancedButton = screen.getByLabelText('advanced')
    expect(beginnerButton).toBeInTheDocument()
    expect(intermediateButton).toBeInTheDocument()
    expect(advancedButton).toBeInTheDocument()

    // Focus Area Buttons
    const upperBodyButton = screen.getByLabelText('upper body')
    const lowerBodyButton = screen.getByLabelText('lower body')
    const fullBodyButton = screen.getByLabelText('full body')
    expect(upperBodyButton).toBeInTheDocument()
    expect(lowerBodyButton).toBeInTheDocument()
    expect(fullBodyButton).toBeInTheDocument()

    // Workout Type Buttons
    const strengthButton = screen.getByLabelText('strength training')
    const bodyButton = screen.getByLabelText('body building')
    expect(strengthButton).toBeInTheDocument()
    expect(bodyButton).toBeInTheDocument()
  })

  test('should call fetchNewGeminiWorkout with selected options when submitting the form', async () => {
    const mockFetchNewGeminiWorkout = fetchNewGeminiWorkout
    mockFetchNewGeminiWorkout.mockResolvedValue({})

    render(
      <MemoryRouter initialEntries={['/form']}>
        <Form />
      </MemoryRouter>
    )

    const intermediateButton = screen.getByLabelText('intermediate')
    const upperBodyButton = screen.getByLabelText('upper body')
    const strengthButton = screen.getByLabelText('strength training')

    // Click Intermediate Button
    fireEvent.click(intermediateButton)

    // Click Upper Body Button
    fireEvent.click(upperBodyButton)

    // Click Strength Button
    fireEvent.click(strengthButton)

    const form = screen.getByTestId('workout-form')

    // Click Submit button
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockFetchNewGeminiWorkout).toHaveBeenCalledTimes(1)
      expect(mockFetchNewGeminiWorkout).toHaveBeenCalledWith(
        'fakeAccessToken', // accessToken
        expect.any(Object), // user
        'upper', // selectedFocusArea
        'strength', // selectedWorkoutType
        'intermediate' // selectedExperienceLevel
      )
    })
  })
})
