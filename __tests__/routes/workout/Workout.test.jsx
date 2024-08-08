import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Workout } from '../../../src/routes/workout/Workout'

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useLocation: vi.fn()
}))

describe('Workout page component with generated workout', () => {
  test('should render the generated workout', async () => {
    const mockLocation = {
      state: {
        workout: {
          workout: {
            level: 'beginner',
            focus_area: 'full',
            type: 'strength',
            exercises: [
              { name: 'Squats' },
              { name: 'Push-ups' },
              { name: 'Planks' }
            ]
          }
        }
      }
    }
    useLocation.mockReturnValue(mockLocation)

    render(
      <MemoryRouter>
        <Workout />
      </MemoryRouter>
    )

    await waitFor(() => {
      const workoutLevel = screen.getByTestId('workout-level')
      expect(workoutLevel).toHaveTextContent(/beginner/i)

      const workoutFocus = screen.getByTestId('workout-focus')
      expect(workoutFocus).toHaveTextContent(/full/i)

      const workoutType = screen.getByTestId('workout-type')
      expect(workoutType).toHaveTextContent(/strength/i)

      const exercises = screen.getAllByTestId('exercise-card')
      expect(exercises.length).toBe(3)
    })
  })
})

describe('Workout page component with no workout', () => {
  test('should render a message when there is no workout', async () => {
    useLocation.mockReturnValue({ state: null })

    render(
      <MemoryRouter>
        <Workout />
      </MemoryRouter>
    )

    await waitFor(() => {
      const noWorkoutMessage = screen.getByText(/no workout to display/i)
      expect(noWorkoutMessage).toBeInTheDocument()
    })
  })
})
