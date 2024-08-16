import { describe, test, expect, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Form } from '../../../src/routes/form/Form'
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
    const [beginnerButton, intermediateButton, advancedButton] = screen.getAllByRole('button', { name: /^(beginner|intermediate|advanced)$/i });
    expect(beginnerButton).toBeInTheDocument()
    expect(intermediateButton).toBeInTheDocument()
    expect(advancedButton).toBeInTheDocument()

    // Focus Area Buttons
    const [upperBodyButton, lowerBodyButton, fullBodyButton] = screen.getAllByRole('button', { name: /^(upper body|lower body|full body)$/i });
    expect(upperBodyButton).toBeInTheDocument()
    expect(lowerBodyButton).toBeInTheDocument()
    expect(fullBodyButton).toBeInTheDocument()

    // Workout Type Buttons
    const [strengthButton, bodyButton] = screen.getAllByRole('button', { name: /^(strength training|body building)$/i });
    expect(strengthButton).toBeInTheDocument()
    expect(bodyButton).toBeInTheDocument()
  })

  test('should disable Submit Button if any form questions are unanswered', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <Form />
      </MemoryRouter>
    )

    const submitButton = screen.getByRole('button', { name: /submit/i })
    expect(submitButton).toBeDisabled()

    const [intermediateButton, upperBodyButton, strengthButton] = screen.getAllByRole('button', { name: /^(intermediate|upper body|strength training)$/i });

    // Select Intermediate Level
    fireEvent.click(intermediateButton)
    expect(submitButton).toBeDisabled()

    // Select Upper Body Focus Area
    fireEvent.click(upperBodyButton)
    expect(submitButton).toBeDisabled()

    // Select Strength type
    fireEvent.click(strengthButton)
    expect(submitButton).toBeEnabled()

    // Deselect Upper Body Focus Area
    fireEvent.click(upperBodyButton)
    expect(submitButton).toBeDisabled()
  })

  test('should call fetchNewGeminiWorkout with selected options when submitting the form', async () => {
    const mockFetchNewGeminiWorkout = fetchNewGeminiWorkout
    mockFetchNewGeminiWorkout.mockResolvedValue({})

    render(
      <MemoryRouter initialEntries={['/form']}>
        <Form />
      </MemoryRouter>
    )
    
    const [intermediateButton, upperBodyButton, strengthButton] = screen.getAllByRole('button', { name: /^(intermediate|upper body|strength training)$/i });

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
