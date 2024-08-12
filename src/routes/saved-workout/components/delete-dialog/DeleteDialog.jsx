import './DeleteDialog.scss'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useAuth0 } from '@auth0/auth0-react'
import { DeleteWorkoutByID } from '../../../../services/UserService'
import { useNavigate } from 'react-router-dom'

export const DeleteDialog = ({ open, handleClose, workoutID }) => {
  const navigate = useNavigate()

  const { getAccessTokenSilently } = useAuth0()

  const deleteWorkout = async () => {
    console.log(`Delete %s`, workoutID)
    try {
      const accessToken = await getAccessTokenSilently()
      await DeleteWorkoutByID(accessToken, workoutID)
      navigate('/home')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '90%',
            borderRadius: 15
          }
        }}
      >
        <DialogTitle>Delete Workout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this workout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={deleteWorkout}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}