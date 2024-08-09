import './ExerciseCard.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export const ExerciseCard = ({ exercise }) => {
  return (
    <>
      <Card
        className="exercise-card"
        data-testid="exercise-card"
        style={{ borderRadius: 15, backgroundColor: '#efefef' }}
      >
        <CardHeader title={exercise.name} data-testid="exercise-card-name" />
        <CardContent>
          <Typography data-testid="exercise-card-rep">
            R: {exercise.reps}
          </Typography>
          <Typography data-testid="exercise-card-set">
            S: {exercise.sets}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
