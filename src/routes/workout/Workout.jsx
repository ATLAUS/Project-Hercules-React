import './Workout.scss'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const Workout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setWorkoutResponse(location.state?.workout)
  }, [location.state])

  return (
    <>
      <h1>Workout</h1>
      <section className="workout-display">
        {workoutResponse ? (
          <div>
            <p data-testid="workout-level">{workoutResponse.workout.level}</p>
            <p data-testid="workout-focus">
              {workoutResponse.workout.focus_area} body
            </p>
            <p data-testid="workout-type">{workoutResponse.workout.type}</p>
            {/* TODO: Implement the exercise cards. */}
            {workoutResponse.workout?.exercises.map((exercise, idx) => (
              <p key={idx}>{exercise.name}</p>
            ))}
          </div>
        ) : (
          <p>No workout to display</p>
          // TODO: Implement a no workout screen or component that takes
          // the user back to the form.
        )}
      </section>
    </>
  )
}
