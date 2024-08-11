import './ExerciseCard.scss'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const ExerciseCard = ({
  exercise,
  setAnchorEl,
  setSelectedExercise
}) => {
  const handleSetAnchorEl = (event) => {
    setAnchorEl(event.currentTarget)
    setSelectedExercise(exercise)
  }

  return (
    <>
      <Card
        className="exercise-card"
        data-testid="exercise-card"
        style={{ borderRadius: 15, backgroundColor: '#efefef' }}
      >
        <CardHeader title={exercise.name} data-testid="exercise-card-name" />
        <div className="exercise-card-content">
          <CardActions
            style={{
              justifyContent: 'flex-end',
              padding: '0'
            }}
          >
            <IconButton
              onClick={handleSetAnchorEl}
              data-testid="more-options-btn"
            >
              <MoreVertIcon />
            </IconButton>
          </CardActions>
          <CardContent>
            <Typography data-testid="exercise-card-rep">
              R: {exercise.reps}
            </Typography>
            <Typography data-testid="exercise-card-set">
              S: {exercise.sets}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  )
}
