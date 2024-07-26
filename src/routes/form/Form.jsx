import './Form.scss'
import * as components from '../../shared/components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const [focusArea, setFocusArea] = useState("")
const [type, setType] = useState("")
const [level, setLevel] = useState("")

async function submitHandler(e) {
  e.preventDefault()

  try {
    
  } catch (error) {
    console.log("error: ", error)
  }
}

export const Form = () => {
  const navigate = useNavigate()

  return (
    <>
      <main>
        <h1>Create Workout</h1>
        <form onSubmit={submitHandler}>

        </form>
        <button onClick={() => navigate('/workout')}>Workout</button>
      </main>
    </>
  )
}
