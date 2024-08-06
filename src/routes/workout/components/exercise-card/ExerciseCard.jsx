import './ExerciseCard.scss'
import Card from '@mui/material/Card'

export const ExerciseCard = ({ exercise }) => {
  return (
    <>
      <Card className="exercise-card">
        <p>{exercise.name}</p>
      </Card>
    </>
  )
}
