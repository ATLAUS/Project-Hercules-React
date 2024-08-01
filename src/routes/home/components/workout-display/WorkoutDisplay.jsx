import Typography from '@mui/material/Typography'
import './WorkoutDisplay.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

export const WorkoutDisplay = ({ workouts }) => {
  return (
    // TODO: Implement actual workout display.
    <>
      <div className="workout-display">
        {!workouts ? (
          <p>No workouts to display.</p>
        ) : (
          workouts.map((workout) => (
            // TODO:
            // [X]1. Make the cards smaller.
            // 2. Adjust the layout.
            // 3. Add some sort of media to the card.
            <Card
              className="workout-card"
              key={workout._id}
              variant="outlined"
              data-testid="workout-card"
              style={{
                background: '#efefef',
                color: '#232933',
                borderRadius: 15
              }}
            >
              <CardHeader title={workout.focus} />
              <CardContent className="workout-card-content">
                <Typography color="text.secondary">{workout.date}</Typography>
                <Typography>{workout.type}</Typography>
              </CardContent>
              <CardActions className="btn-container">
                <IconButton
                  className="view-button"
                  style={{ background: '#0167ff', color: '#fff' }}
                  onClick={() => {
                    console.log('workout %s was clicked', workout._id)
                  }}
                >
                  <ArrowOutwardIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
