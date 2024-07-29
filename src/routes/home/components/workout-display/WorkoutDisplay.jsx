import Typography from '@mui/material/Typography'
import './WorkoutDisplay.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

export const WorkoutDisplay = ({ workouts }) => {
  return (
    // TODO: Implement actual workout display.
    <>
      <div className="workout-display">
        {!workouts ? (
          <p>No workouts to display.</p>
        ) : (
          workouts.map((workout) => (
            <Card
              className="workout-card"
              key={workout.id}
              variant="outlined"
              data-testid="workout-card"
            >
              <CardHeader title={workout.focus} />
              <CardContent>
                <Typography color="text.secondary">{workout.date}</Typography>
                <Typography>{workout.type}</Typography>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
