import './SavedWorkout.scss'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchWorkoutByID } from '../../services/UserService'
import * as components from './components'
import Fab from '@mui/material/Fab'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

export const SavedWorkout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const [open, setOpen] = useState(false)
  const { workoutID } = useParams()
  const { getAccessTokenSilently } = useAuth0()
  const hasFetched = useRef(false)
  const navigate = useNavigate()

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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
          <section className="saved-workout-details">
            <nav className="nav-bar">
              <IconButton
                style={{ borderRadius: '50%' }}
                onClick={() => navigate('/home')}
              >
                <HomeIcon style={{ color: 'white' }} />
              </IconButton>
            </nav>
            <header className="saved-workout-header">
              <h1 className="saved-workout-name" data-testid="workout-name">
                {workoutResponse.workout?.name.toUpperCase()}
              </h1>
              <div className="saved-workout-params">
                <p className="saved-workout-focus">
                  Focus Area: {workoutResponse.workout?.focusArea} body
                </p>
                <p className="saved-workout-type">
                  Workout Type: {workoutResponse.workout?.type}
                </p>
                <p className="saved-workout-level">
                  Level: {workoutResponse.workout?.level}
                </p>
              </div>
            </header>
          </section>
          <section className="saved-workout-exercise-cards-display">
            {workoutResponse.workout?.exercises.map((exercise, idx) => (
              <components.ExerciseCard key={idx} exercise={exercise} />
            ))}
          </section>
          <Fab
            aria-label="delete"
            onClick={handleOpen}
            sx={{
              position: 'fixed',
              right: 16,
              bottom: 16,
              backgroundColor: '#efefef'
            }}
            data-testid="delete-workout-btn"
          >
            <DeleteIcon color="error" />
          </Fab>
          {/* Modal */}
          <components.DeleteDialog
            open={open}
            handleClose={handleClose}
            workoutID={workoutID}
          />
        </>
      ) : (
        // TODO: Replace this with a spinner.
        <p>Loading...</p>
      )}
    </section>
  )
}
