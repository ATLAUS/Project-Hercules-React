import './ExerciseCard.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export const ExerciseCard = ({ exercise }) => {
  return (
    <>
      <Card className="exercise-card" data-testid="exercise-card">
        <CardHeader title={exercise.name} />
        <CardContent>
          <Typography>R: {exercise.reps}</Typography>
          <Typography>S: {exercise.sets}</Typography>
        </CardContent>
      </Card>
    </>
  )
}
