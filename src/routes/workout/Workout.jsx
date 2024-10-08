// TODO: Rename file and directory to GeneratedWorkout
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
import RefreshIcon from '@mui/icons-material/Refresh'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import RemoveIcon from '@mui/icons-material/Remove'
import EditIcon from '@mui/icons-material/Edit'
import { alpha } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchNewGeminiWorkout } from '../../services/GeminiService'

import AddIcon from '@mui/icons-material/Add'


export const Workout = () => {
  const [workoutResponse, setWorkoutResponse] = useState(null)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [bottomSheetView, setBottomSheetView] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setSelectedExercise(null)
  }

  const handleRemoveExercise = () => {
    if (selectedExercise) {
      const updatedExercises = workoutResponse.workout.exercises.filter(
        (exercise) => exercise.name !== selectedExercise.name
      )
      const newWorkoutResponse = {
        ...workoutResponse,
        workout: {
          ...workoutResponse.workout,
          exercises: updatedExercises
        }
      }

      setWorkoutResponse(newWorkoutResponse)
      handlePopoverClose()
    }
  }

  const handleAddExercise = (exercise) => {
    const updatedWorkoutResponse = {
      ...workoutResponse,
      workout: {
        ...workoutResponse.workout,
        exercises: [...workoutResponse.workout.exercises, exercise]
      }
    }
    setWorkoutResponse(updatedWorkoutResponse)
  }

  const showBottomSheet = (bottomSheetView) => {
    setBottomSheetView(!bottomSheetView)
  }

  const popoverOpen = Boolean(anchorEl)
  const id = popoverOpen ? 'simple-popover' : undefined

  const { user, getAccessTokenSilently } = useAuth0()

  async function generateNewWorkout() {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE || 'http://localhost:3001'
        }
      })

      const regeneratedWorkout = await fetchNewGeminiWorkout(
        accessToken,
        user,
        workoutResponse?.workout?.focus_area,
        workoutResponse?.workout?.type,
        workoutResponse?.workout?.level
      )
      setWorkoutResponse(regeneratedWorkout)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    setWorkoutResponse(location.state?.workout)
  }, [location.state])

  return (
    <>
      <section className="generated-workout-display">
        {workoutResponse ? (
          <>
            <section className={`workout-details`}>
              <nav className="nav-bar">
                <IconButton
                  style={{ borderRadius: '50%', backgroundColor: '#353935' }}
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon style={{ color: 'white' }} />
                </IconButton>
                <div>
                <IconButton
                  style={{ borderRadius: '50%', backgroundColor: '#353935' }}
                  onClick={() => generateNewWorkout()}
                  data-testid='regenerate-btn'
                >
                  <RefreshIcon style={{ color: 'white' }} />
                </IconButton>
                <IconButton
                  style={{ borderRadius: '50%', backgroundColor: '#353935' }}
                  onClick={() => navigate('/home')}
                >
                  <HomeIcon style={{ color: 'white' }} />
                </IconButton>
                </div>
              </nav>
              <h1 className="focus-area" data-testid="workout-focus">
                {workoutResponse.workout?.focus_area?.toUpperCase()} BODY
              </h1>
              <p className="workout-type" data-testid="workout-type">
                {workoutResponse.workout?.type} training
              </p>
              <p className="workout-level" data-testid="workout-level">
                {workoutResponse.workout?.level}
              </p>
            </section>
            <section className="exercise-cards">
              {workoutResponse.workout?.exercises?.map((exercise, idx) => (
                <components.ExerciseCard
                  key={idx}
                  exercise={exercise}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  setSelectedExercise={setSelectedExercise}
                />
              ))}
              <Button
                onClick={() => showBottomSheet(bottomSheetView)}
                startIcon={<AddIcon />}
                style={{
                  backgroundColor: '#efefef',
                  height: '10%',
                  width: '80%',
                  borderRadius: 15,
                  marginBottom: 20
                }}
                data-testid="add-exercise-btn"
              >
                Add Exercise
             </Button>

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

            {/* Modals */}
            <components.SaveDialog
              open={open}
              handleClose={handleClose}
              workoutResponse={workoutResponse}
            />
            <components.AddExerciseBottomSheet
              bottomSheetView={bottomSheetView}
              showBottomSheet={showBottomSheet}
              handleAddExercise={handleAddExercise}
            />
            {/* TODO: Move popover to separate component */}
            <Popover
              id={id}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              elevation={0}
              slotProps={{
                paper: {
                  sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    backgroundColor: alpha('#1f202b', 0.5),
                    backdropFilter: 'blur(5px)',
                    width: '30%'
                  }
                }
              }}
            >
              <Button
                startIcon={<RemoveIcon style={{ color: '#efefef' }} />}
                style={{ color: '#efefef' }}
                data-testid="remove-exercise"
                onClick={handleRemoveExercise}
              >
                Remove
              </Button>
              <Button
                startIcon={<EditIcon style={{ color: '#efefef' }} />}
                style={{ color: '#efefef' }}
              >
                Edit
              </Button>
            </Popover>
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
