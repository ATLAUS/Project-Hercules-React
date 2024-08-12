import { describe, expect, test, beforeEach, vi } from 'vitest'
import {
  fetchUserDetails,
  saveWorkout,
  fetchWorkoutByID
} from '../../src/services/UserService'

// eslint-disable-next-line no-undef
global.fetch = vi.fn()

const createFetchResponse = (data) => {
  return {
    json: () => new Promise((resolve) => resolve(data))
  }
}

beforeEach(() => {
  vi.resetAllMocks()
})

// TODO: Should also test error cases? (e.g. fetch fails)

describe('Fetch User Details', () => {
  test('should return user details', async () => {
    const mockAuthUser = {
      email: 'test@user.com',
      nickname: 'test',
      sub: 'abc|123'
    }

    const mockUser = {
      _id: 'a1b2c3',
      nickname: 'test',
      email: 'test@user.com',
      userId: '123'
    }

    fetch.mockResolvedValue(createFetchResponse(mockUser))

    const user = await fetchUserDetails('token', mockAuthUser)

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/users', {
      headers: {
        Authorization: `Bearer token`,
        'X-User-Info': JSON.stringify(mockAuthUser)
      }
    })
    expect(user).toEqual(mockUser)
  })
})

describe('User Saves a Workout', () => {
  test('Should return the saved workout', async () => {
    const workoutFromGemini = {
      level: 'intermediate',
      focus_area: 'upper',
      type: 'strength',
      exercises: [
        {
          name: 'Bench Press',
          rep: 10,
          set: 3
        },
        {
          name: 'Bicep Curls',
          rep: 12,
          set: 3
        }
      ]
    }

    const name = 'Workout Name'

    const mockWorkoutFromDB = {
      _id: '111',
      name: 'Workout Name',
      level: 'intermediate',
      focusArea: 'upper',
      type: 'strength',
      exercises: [
        {
          name: 'Bench Press',
          rep: 10,
          set: 3
        },
        {
          name: 'Bicep Curls',
          rep: 12,
          set: 3
        }
      ]
    }

    fetch.mockResolvedValue(createFetchResponse(mockWorkoutFromDB))

    const workout = await saveWorkout(
      'token',
      '1a2b3c',
      workoutFromGemini,
      name
    )

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/workouts/userId/1a2b3c',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...workoutFromGemini, name })
      }
    )

    expect(workout).toEqual(mockWorkoutFromDB)
  })
})

describe(' User fetches a workout by ID', () => {
  test('should return a workout', async () => {
    const mockWorkout = {
      _id: '111',
      name: 'Workout Name',
      level: 'intermediate',
      focusArea: 'upper',
      type: 'strength',
      exercises: [
        {
          name: 'Bench Press',
          rep: 10,
          set: 3
        },
        {
          name: 'Bicep Curls',
          rep: 12,
          set: 3
        }
      ]
    }

    fetch.mockResolvedValue(createFetchResponse(mockWorkout))

    const workout = await fetchWorkoutByID('token', '111')

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/v1/workouts/111',
      {
        headers: {
          Authorization: 'Bearer token'
        }
      }
    )

    expect(workout).toEqual(mockWorkout)
  })
})
