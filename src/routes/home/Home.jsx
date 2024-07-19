import './Home.scss'
import * as components from '../../components'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <main>
        <h1>Home</h1>
        <button onClick={() => navigate('/form')}>Form</button>
        <button onClick={() => navigate('/workout')}>Workout</button>
      </main>
    </>
  )
}