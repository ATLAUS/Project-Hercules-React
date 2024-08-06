import './Workout.scss'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import * as components from './components'

export const Workout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setWorkoutResponse(location.state?.workout)
  }, [location.state])

  return (
    <>
      <section className="workout-display">
        {workoutResponse ? (
          <>
            <section className="workout-details">
              <p data-testid="workout-level">{workoutResponse.workout.level}</p>
              <p data-testid="workout-focus">
                {workoutResponse.workout.focus_area} body
              </p>
              <p data-testid="workout-type">{workoutResponse.workout.type}</p>
            </section>
            <section className="exercise-cards">
              {workoutResponse.workout?.exercises.map((exercise, idx) => (
                <components.ExerciseCard key={idx} exercise={exercise} />
              ))}
            </section>
          </>
        ) : (
          <p>No workout to display</p>
          // TODO: Implement a no workout screen or component that takes
          // the user back to the form.
        )}
      </section>
    </>
  )
}
