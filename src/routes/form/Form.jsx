import './Form.scss'
import * as components from '../../components'
import { useNavigate } from 'react-router-dom'

export const Form = () => {
  const navigate = useNavigate()

  return (
    <>
      <main>
        <h1>Form</h1>
        <button onClick={() => navigate('/workout')}>Workout</button>
      </main>
    </>
  )
}