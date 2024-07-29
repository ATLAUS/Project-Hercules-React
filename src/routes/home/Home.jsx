import { useState } from 'react'
import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'

export const Home = () => {
  const [open, setOpen] = useState(false)
  const [bottomSheetView, setBottomSheetView] = useState(false)
  const [workouts] = useState(null)
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
              <Avatar alt="user-avatar" sx={{ width: 96, height: 96 }} />
            ) : (
              <img
                className="profile-picture"
                src={user.picture}
                alt="profile-picture"
              />
            )}
          </div>
          <Button
            onClick={() => showBottomSheet(bottomSheetView)}
            startIcon={<AddIcon />}
            sx={{ background: '#CEFF00', borderRadius: 15 }}
            disableElevation
            data-testid="add-workout-button"
          >
            Add Workout
          </Button>
          <h1>Workouts</h1>
          <components.WorkoutDisplay workouts={workouts} />
        </section>
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
