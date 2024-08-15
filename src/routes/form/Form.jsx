import './Form.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchNewGeminiWorkout } from '../../services/GeminiService'

export const Form = () => {
  const [focusArea, setFocusArea] = useState('')
  const [type, setType] = useState('')
  const [level, setLevel] = useState('')

  const { user, getAccessTokenSilently } =
  useAuth0()

  const navigate = useNavigate()

  const handlelevel = (event, newLevel) => {
    setLevel(newLevel);
  };

  const handleType = (event, newType) => {
    setType(newType);
  }

  const handleFocus = (event, newFocusArea) => {
    setFocusArea(newFocusArea);
  }

  async function submitHandler(e) {
    e.preventDefault()
  
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE || 'http://localhost:3001'
        }
      })

      const workout = await fetchNewGeminiWorkout(accessToken, user, focusArea, type, level)
      navigate('/workout', { state: {workout: workout}})
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <>
      <div className='form-page'>
        <section className='form-page-header'>
          <nav className="nav-bar">
            <IconButton
              style={{ borderRadius: '50%', backgroundColor: '#007bff' }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon style={{ color: 'white' }} />
            </IconButton>
          </nav>
          <h1 className='header-text'>CREATE WORKOUT</h1>
        </section>
        <form onSubmit={submitHandler} data-testid="workout-form" className='workout-form'>
          <div>
            <div className='grid-item'>
              <h2>Experience Level</h2>
              <ToggleButtonGroup
                value={level}
                exclusive
                onChange={handlelevel}
                aria-label="experience level"
              >
                <ToggleButton value="beginner" aria-label="beginner" className='toggle-btn' >Beginner</ToggleButton>
                <ToggleButton value="intermediate" aria-label="intermediate" className='toggle-btn middle-toggle' >Intermediate</ToggleButton>
                <ToggleButton value="advanced" aria-label="advanced" className='toggle-btn' >Advanced</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className='grid-item'>
              <h2>Focus Area</h2>
              <ToggleButtonGroup
                variant='text'
                value={focusArea}
                exclusive
                onChange={handleFocus}
                aria-label="focus area"
              >
                <ToggleButton value="upper" aria-label="upper body" className='toggle-btn' >Upper Body</ToggleButton>
                <ToggleButton value="lower" aria-label="lower body" className='toggle-btn middle-toggle' >Lower Body</ToggleButton>
                <ToggleButton value="full" aria-label="full body" className='toggle-btn' >Full Body</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className='grid-item'>
              <h2>Workout Type</h2>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={handleType}
                aria-label="workout type"
              >
                <ToggleButton value="strength" aria-label="strength training" className='toggle-btn'>Strength</ToggleButton>
                <ToggleButton value="body" aria-label="body building" className='toggle-btn' >Body Building</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div>
              <Button type="submit" data-testid="submit-button"  className='submit-btn'>Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}