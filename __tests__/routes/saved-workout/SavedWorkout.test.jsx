import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SavedWorkout } from '../../../src/routes/saved-workout/SavedWorkout'
import { UserContext } from '../../../src/App'

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
  })
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
})
