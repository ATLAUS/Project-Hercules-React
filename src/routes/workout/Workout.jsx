import './Workout.scss'
import * as components from '../../shared/components'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const Workout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const workout = location.state?.workout
  useEffect(() => {
    console.log(workout)
  }, [workout])

  return (
    <>
      <main>
        <h1>Workout</h1>
      </main>
    </>
  )
}
