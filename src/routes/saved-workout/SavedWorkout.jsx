import './SavedWorkout.scss'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchWorkoutByID } from '../../services/UserService'
import * as components from './components'

export const SavedWorkout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const { workoutID } = useParams()
  const { getAccessTokenSilently } = useAuth0()
  const hasFetched = useRef(false)

  const fetchWorkout = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE || 'http://localhost:3001'
        }
      })

      const response = await fetchWorkoutByID(accessToken, workoutID)

      setWorkoutResponse(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (workoutID && !hasFetched.current) {
      fetchWorkout()
      hasFetched.current = true
    }
  }, [workoutID])

  return (
    <section className="saved-workout-display">
      {workoutResponse ? (
        <>
          <section className="workout-details">
            <h1 className="workout-name" data-testid="workout-name">
              {workoutResponse.workout?.name}
            </h1>
            <p>{workoutResponse.workout?.focusArea}</p>
            <p>{workoutResponse.workout?.level}</p>
          </section>
          <section className="exercise-cards">
            {workoutResponse.workout?.exercises.map((exercise, idx) => (
              <components.ExerciseCard key={idx} exercise={exercise} />
            ))}
          </section>
        </>
      ) : (
        // TODO: Replace this with a spinner.
        <p>Loading...</p>
      )}
    </section>
  )
}
