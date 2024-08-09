import './SaveDialog.scss'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useAuth0 } from '@auth0/auth0-react'
import { useContext } from 'react'
import { UserContext } from '../../../../App'
import { saveWorkout } from '../../../../services/UserService'
import { useNavigate } from 'react-router-dom'

export const SaveDialog = ({ open, handleClose, workoutResponse }) => {
  const { getAccessTokenSilently } = useAuth0()
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const formJSON = Object.fromEntries(formData.entries())
          const name = formJSON.name
          // TODO: Move to a helper function.
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE || 'http://localhost:3001'
            }
          })
          await saveWorkout(
            accessToken,
            userData.user._id,
            workoutResponse?.workout,
            name
          )
          handleClose()
          navigate('/home')
        },
        style: {
          width: '90%',
          borderRadius: 15
        }
      }}
    >
      <DialogTitle>Name Your Workout</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          id="name"
          name="name"
          label="Workout Name"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  )
}
