import './Workout.scss'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import * as components from './components'

export const Workout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setWorkoutResponse(location.state?.workout)
  }, [location.state])

  return (
    <>
      <section className="generated-workout-display">
        {workoutResponse ? (
          <>
            <section className="workout-details">
              <h1 className="focus-area" data-testid="workout-focus">
                {workoutResponse.workout.focus_area.toUpperCase()} BODY
              </h1>
              <p className="workout-type" data-testid="workout-type">
                {workoutResponse.workout.type} training
              </p>
              <p className="workout-level" data-testid="workout-level">
                {workoutResponse.workout.level}
              </p>
            </section>
            <section className="exercise-cards">
              {workoutResponse.workout?.exercises.map((exercise, idx) => (
                <components.ExerciseCard key={idx} exercise={exercise} />
              ))}
            </section>
          </>
        ) : (
          // TODO: Implement a no workout screen or component that takes
          // the user back to the form.
          <p>No workout to display</p>
        )}
        <div className="save-container">
          <Button variant="contained">Save</Button>
        </div>
      </section>
    </>
  )
}
