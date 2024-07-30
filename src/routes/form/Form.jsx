import './Form.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'



export const Form = () => {
  const [focusArea, setFocusArea] = useState('')
  const [type, setType] = useState('')
  const [level, setLevel] = useState('')

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
            <ToggleButton value="beginner" aria-label="beginner">Beginner</ToggleButton>
            <ToggleButton value="intermediate" aria-label="intermediate">Intermediate</ToggleButton>
            <ToggleButton value="advanced" aria-label="advanced">Advanced</ToggleButton>
          </ToggleButtonGroup>

          <h2>Focus Area</h2>
          <ToggleButtonGroup
            value={focusArea}
            exclusive
            onChange={handleFocus}
            aria-label="focus area"
          >
            <ToggleButton value="upper" aria-label="upper body">Upper Body</ToggleButton>
            <ToggleButton value="lower" aria-label="lower body">Lower Body</ToggleButton>
            <ToggleButton value="full" aria-label="full body">Full Body</ToggleButton>
          </ToggleButtonGroup>
          <h2>Workout Type</h2>
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={handleType}
            aria-label="workout type"
          >
            <ToggleButton value="strength" aria-label="strength training">Strength</ToggleButton>
            <ToggleButton value="body" aria-label="body building">Body Building</ToggleButton>
          </ToggleButtonGroup>
        </form>
        <button onClick={() => navigate('/workout')}>Workout</button>
      </main>
    </>
  )
}