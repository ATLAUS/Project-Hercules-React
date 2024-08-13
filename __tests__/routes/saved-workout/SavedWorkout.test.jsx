import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SavedWorkout } from '../../../src/routes/saved-workout/SavedWorkout'
import { UserContext } from '../../../src/App'
import { DeleteWorkoutByID } from '../../../src/services/UserService'

const mockUserContextValue = {
  userData: {
    _id: '111',
    nickname: 'test user'
  },
  setUserData: vi.fn()
}

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      name: 'test user'
    },
    getAccessTokenSilently: vi.fn().mockResolvedValue('access-token')
  })
}))

vi.mock('../../../src/services/UserService', () => ({
  fetchWorkoutByID: vi.fn().mockResolvedValue({
    workout: {
      _id: '123',
      name: 'test workout',
      focusArea: 'upper',
      level: 'beginner',
      exercises: [
        {
          name: 'test exercise',
          sets: 3,
          reps: 12
        }
      ]
    }
  }),
  DeleteWorkoutByID: vi.fn().mockResolvedValue({ msg: 'Workout deleted' })
}))

describe('SavedWorkout component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render the selected workout', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={[`/saved-workout/123`]}>
          <Routes>
            <Route
              path="/saved-workout/:workoutID"
              element={<SavedWorkout />}
            />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    )
    await waitFor(() => {
      const workoutName = screen.getByTestId('workout-name')
      expect(workoutName).toHaveTextContent('test workout')

      const exercises = screen.getAllByTestId('exercise-card')
      expect(exercises).toHaveLength(1)
    })
  })

  test('should delete a workout', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={[`/saved-workout/123`]}>
          <Routes>
            <Route
              path="/saved-workout/:workoutID"
              element={<SavedWorkout />}
            />
            <Route path="/home" element={<p>Temp Home</p>} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    )

    await waitFor(() => {
      const deleteButton = screen.getByTestId('delete-workout-btn')
      expect(deleteButton).toBeInTheDocument()
    })

    const deleteButton = screen.getByTestId('delete-workout-btn')
    deleteButton.click()

    await waitFor(() => {
      const confirmDeleteButton = screen.getByTestId('confirm-delete-btn')
      expect(confirmDeleteButton).toBeInTheDocument()
      confirmDeleteButton.click()
    })

    // 1). Validate that the DeleteWorkoutByID function was called.
    // 2). Validate that we were navigated back to the /home path.
    expect(DeleteWorkoutByID).toHaveBeenCalledTimes(1)
    const homePage = screen.getByText(/home/i)
    expect(homePage).toBeInTheDocument()
  })
})
