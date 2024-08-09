import './SaveDialog.scss'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

export const SaveDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const formJSON = Object.fromEntries(formData.entries())
          const name = formJSON.name
          console.log(name)
          // TODO: Implement save workout functionality
          // 1). call the saveWorkout function
          // 2). Navigate to the home page?
          handleClose()
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
