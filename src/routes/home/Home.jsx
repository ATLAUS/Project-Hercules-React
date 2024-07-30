import { useState } from 'react'
import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'

export const Home = () => {
  const [open, setOpen] = useState(false)
  const [bottomSheetView, setBottomSheetView] = useState(false)
  const [workouts] = useState([
    { id: 1, date: '07/27/24', type: 'Strength Training', focus: 'Upper' },
    { id: 2, date: '07/29/24', type: 'Strength Training', focus: 'Lower' },
    { id: 3, date: '08/01/24', type: 'Strength Training', focus: 'Upper' },
    { id: 4, date: '08/01/24', type: 'Strength Training', focus: 'Upper' }
  ])
  const { user } = useAuth0()

  const handleOpen = (viewValue) => {
    setOpen(!viewValue)
  }

  const showBottomSheet = (bottomSheetView) => {
    setBottomSheetView(!bottomSheetView)
  }

  return (
    <>
      <div className="home-page">
        {/* TODO: Nav should be sticky. */}
        <nav className="nav">
          <Tooltip title="Menu">
            <Button onClick={() => handleOpen(open)} data-testid="menu-button">
              <MenuIcon fontSize="large" sx={{ color: '#CEFF00' }} />
            </Button>
          </Tooltip>
        </nav>
        <section className="content">
          <div className="user-display">
            {!user ? (
              <Avatar alt="user-avatar" sx={{ width: 110, height: 110 }} />
            ) : (
              <img
                className="profile-picture"
                src={user.picture}
                alt="profile-picture"
              />
            )}
          </div>
          <h1 className="workouts-title">Workouts</h1>
          <components.WorkoutDisplay workouts={workouts} />
        </section>
        <Fab
          onClick={() => showBottomSheet(bottomSheetView)}
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            background: '#CEFF00',
            color: '#024bb9'
          }}
          data-testid="add-workout-fab"
        >
          <AddIcon />
        </Fab>
      </div>

      {/* Drawers */}
      <components.SideBar open={open} handleOpen={handleOpen} user={user} />
      <components.BottomSheet
        bottomSheetView={bottomSheetView}
        showBottomSheet={showBottomSheet}
      />
    </>
  )
}
