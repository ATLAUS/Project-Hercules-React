import Typography from '@mui/material/Typography'
import './WorkoutDisplay.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
              <CardHeader
                className="workout-card-title"
                title={workout.focus.toUpperCase() + ' BODY'}
              />
              <CardContent className="workout-card-content">
                <Typography>{workout.type}</Typography>
                <Typography color="text.secondary">{workout.date}</Typography>
              </CardContent>
              <CardActions className="btn-container">
                <IconButton
                  style={{ background: '#0167ff', color: '#fff' }}
                  onClick={() => {
                    console.log('workout %s was clicked', workout._id)
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
