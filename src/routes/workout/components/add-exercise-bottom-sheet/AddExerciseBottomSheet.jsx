import './AddExerciseBottomSheet.scss'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

export const AddExerciseBottomSheet = ({
  bottomSheetView,
  showBottomSheet,
  handleAddExercise
}) => {
  return (
    <>
      <Drawer
        className="add-exercise-bottom-sheet"
        open={bottomSheetView}
        anchor="bottom"
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const newExercise = Object.fromEntries(formData.entries())

            handleAddExercise(newExercise)
            showBottomSheet(bottomSheetView)
          },
          style: {
            height: '50%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
        onClose={() => showBottomSheet(bottomSheetView)}
      >
        <div className="add-exercise-bottom-sheet-title">
          <h2>Add Exercise</h2>
        </div>
        <div className="add-exercise-bottom-sheet-content">
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Exercise Name"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            id="reps"
            name="reps"
            label="Reps"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            id="sets"
            name="sets"
            label="Sets"
            type="number"
            fullWidth
            variant="standard"
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#0167ff' }}
            startIcon={<AddIcon />}
            disableElevation
          >
            Add
          </Button>
        </div>
      </Drawer>
    </>
  )
}
