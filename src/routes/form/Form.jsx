import './Form.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
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
          audience: 'http://localhost:3001'
        }
      })

      const workout = await fetchNewGeminiWorkout(accessToken, user, focusArea, type, level)
      // TODO: delete this console.log before pushing
      console.log("Navigating away")
      navigate('/workout', { state: {workout: workout}})
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <>
      <main>
        <h1>Create Workout</h1>
        <form onSubmit={submitHandler}>

          <h2>Experience Level</h2>
          <ToggleButtonGroup
            value={level}
            exclusive
            onChange={handlelevel}
            aria-label="experience level"
          >
            <ToggleButton value="beginner" aria-label="beginner" sx={{color: 'white', border: 'white 1px solid'}}>Beginner</ToggleButton>
            <ToggleButton value="intermediate" aria-label="intermediate" sx={{color: 'white', border: 'white 1px solid'}}>Intermediate</ToggleButton>
            <ToggleButton value="advanced" aria-label="advanced" sx={{color: 'white', border: 'white 1px solid'}}>Advanced</ToggleButton>
          </ToggleButtonGroup>

          <h2>Focus Area</h2>
          <ToggleButtonGroup
            value={focusArea}
            exclusive
            onChange={handleFocus}
            aria-label="focus area"
          >
            <ToggleButton value="upper" aria-label="upper body" sx={{color: 'white', border: 'white 1px solid'}}>Upper Body</ToggleButton>
            <ToggleButton value="lower" aria-label="lower body" sx={{color: 'white', border: 'white 1px solid'}}>Lower Body</ToggleButton>
            <ToggleButton value="full" aria-label="full body" sx={{color: 'white', border: 'white 1px solid'}}>Full Body</ToggleButton>
          </ToggleButtonGroup>
          <h2>Workout Type</h2>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleType}
            aria-label="workout type"
          >
            <ToggleButton value="strength" aria-label="strength training" sx={{color: 'white', border: 'white 1px solid'}}>Strength</ToggleButton>
            <ToggleButton value="body" aria-label="body building" sx={{color: 'white', border: 'white 1px solid'}}>Body Building</ToggleButton>
          </ToggleButtonGroup>

          <button type="submit">Submit</button>
        </form>
        <button onClick={() => navigate('/workout')}>Workout</button>
      </main>
    </>
  )
}