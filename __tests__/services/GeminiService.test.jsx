import { describe, expect, test, vi } from 'vitest'
import { fetchNewGeminiWorkout } from '../../src/services/GeminiService'

// eslint-disable-next-line no-undef
global.fetch = vi.fn()

const createFetchResponse = (data) => {
    return {
      json: () => new Promise((resolve) => resolve(data))
    }
  }

  describe('Fetch Gemini Workout', () => {
    test('should return a workout', async () => {
        const mockAuthUser = {
            email: 'test@user.com',
            nickname: 'test',
            sub: 'abc|123'
        }


        const mockWorkout = {
            focus_area: "lower",
            type: "body",
            level: "beginner",
            exercises: [
                {
                    name: 'squat',
                    reps: 10,
                    sets: 3
                }
            ]
        }

        fetch.mockResolvedValue(createFetchResponse(mockWorkout))

        const workout = await fetchNewGeminiWorkout('token', mockAuthUser, 'lower', 'body', 'beginner')

        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/gemini/workout?focus=lower&type=body&level=beginner', {
            headers: {
                Authorization: `Bearer token`,
                'X-User-Info': JSON.stringify(mockAuthUser)
            }
        })

        expect(workout).toBeTypeOf("object")
        expect(workout.focus_area).toBe("lower")
        expect(workout.type).toBe("body")
        expect(workout.level).toBe("beginner")
        
        expect(workout.exercises[0].name).toBe('squat')
    })
  })