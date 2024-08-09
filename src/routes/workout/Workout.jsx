import './Workout.scss'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import Fab from '@mui/material/Fab'
import * as components from './components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'

export const Workout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  let className = workoutResponse?.workout.focus_area

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setWorkoutResponse(location.state?.workout)
  }, [location.state])

  return (
    <>
      <section className="generated-workout-display">
        {workoutResponse ? (
          <>
            <section className={`workout-details ${className}`}>
              <nav className="nav-bar">
                <IconButton
                  style={{ borderRadius: '50%', backgroundColor: '#007bff' }}
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon style={{ color: 'white' }} />
                </IconButton>
                <IconButton
                  style={{ borderRadius: '50%', backgroundColor: '#007bff' }}
                  onClick={() => navigate('/home')}
                >
                  <HomeIcon style={{ color: 'white' }} />
                </IconButton>
              </nav>
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
            <Fab
              aria-label="save"
              onClick={handleOpen}
              sx={{
                position: 'fixed',
                right: 16,
                bottom: 16,
                backgroundColor: '#efefef',
                color: '#0167ff'
              }}
              disableTouchRipple
            >
              <SaveIcon />
            </Fab>
            <components.SaveDialog
              open={open}
              handleClose={handleClose}
              workoutResponse={workoutResponse}
            />
          </>
        ) : (
          // TODO: Implement a no workout screen or component that takes
          // the user back to the form.
          <p>No workout to display</p>
        )}
      </section>
    </>
  )
}
