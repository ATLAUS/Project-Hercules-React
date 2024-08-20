import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { Workout } from '../../../src/routes/workout/Workout'
import { UserContext } from '../../../src/App'

const mockUserContextValue = {
  userData: {
    user: {
      _id: '123'
    }
  }
}

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useLocation: vi.fn()
}))

describe('Workout page component with generated workout', () => {
  const mockLocation = {
    state: {
      workout: {
        workout: {
          level: 'beginner',
          focus_area: 'full',
          type: 'strength',
          exercises: [
            { name: 'Squats', reps: 10, sets: 3 },
            { name: 'Push-ups', reps: 10, sets: 3 },
            { name: 'Pull-ups', reps: 10, sets: 3 }
          ]
        }
      }
    }
  }

  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation)
  })

  afterEach(() => {
    useLocation.mockReset()
  })

  test('should render the generated workout', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Workout />
        </MemoryRouter>
      </UserContext.Provider>
    )

    const workoutLevel = screen.getByTestId('workout-level')
    expect(workoutLevel).toHaveTextContent(/beginner/i)

    const workoutFocus = screen.getByTestId('workout-focus')
    expect(workoutFocus).toHaveTextContent(/full/i)

    const workoutType = screen.getByTestId('workout-type')
    expect(workoutType).toHaveTextContent(/strength/i)

    const exercises = screen.getAllByTestId('exercise-card')
    expect(exercises.length).toBe(3)
  })

  test('should remove an exercise from the workout', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Workout />
        </MemoryRouter>
      </UserContext.Provider>
    )

    // Set up the query for the 'Squats' exercise card so it can be removed.
    const [squats] = screen.getAllByTestId('exercise-card')

    const squatOptionsButton = within(squats).getByTestId('more-options-btn')
    expect(squatOptionsButton).toBeDefined()

    // Click the 'more options' button.
    squatOptionsButton.click()

    // Click the 'remove' button
    const removeButton = await screen.findByText(/remove/i)
    removeButton.click()

    await waitFor(async () => {
      // Re-query the document to check if the 'Squats' exercise card is no longer there.
      const exercises = screen.getAllByTestId('exercise-card')

      expect(exercises.length).toBe(2)
      expect(screen.queryByText(/squats/i)).toBeNull()
    })
  })

  test('should allow user to add an exercise to the workout', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Workout />
        </MemoryRouter>
      </UserContext.Provider>
    )

    // Get the 'Add Exercise' button and click it.
    const addExerciseButton = screen.getByTestId('add-exercise-btn')
    expect(addExerciseButton).toBeDefined()
    addExerciseButton.click()

    // Check that the AddExerciseBottomSheet is rendered.
    const AddExerciseBottomSheet = await screen.findByTestId(
      'add-exercise-bottom-sheet'
    )
    expect(AddExerciseBottomSheet).toBeDefined()

    // Get the form inputs, submit button, and fill out the form.
    const exerciseNameInput = screen.getByTestId('exercise-name-input')
    const exerciseRepsInput = screen.getByTestId('exercise-reps-input')
    const exerciseSetsInput = screen.getByTestId('exercise-sets-input')
    const confirmAddExerciseButton = screen.getByTestId(
      'confirm-add-exercise-btn'
    )
    fireEvent.change(exerciseNameInput.querySelector('input'), {
      target: { value: 'Bench Press' }
    })
    fireEvent.change(exerciseRepsInput.querySelector('input'), {
      target: { value: 10 }
    })
    fireEvent.change(exerciseSetsInput.querySelector('input'), {
      target: { value: 3 }
    })
    confirmAddExerciseButton.click()

    // Validate that the new exercise is added to the workout.
    const newExercise = await screen.findByText(/bench press/i)
    expect(newExercise).toBeDefined()
    const exercises = screen.getAllByTestId('exercise-card')
    expect(exercises.length).toBe(4)
  })

  // TODO: Implement the following tests
  // test('should save a workout', async () => {})
})

describe('Workout page component with no workout', () => {
  test('should render a message when there is no workout', async () => {
    useLocation.mockReturnValue({ state: null })

    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <Workout />
        </MemoryRouter>
      </UserContext.Provider>
    )

    const noWorkoutMessage = screen.getByText(/no workout to display/i)
    expect(noWorkoutMessage).toBeInTheDocument()
  })
})
