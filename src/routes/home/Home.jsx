import { useState } from 'react'
import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Avatar, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const Home = () => {
  const [open, setOpen] = useState(false)
  const [bottomSheetView, setBottomSheetView] = useState(false)
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
          <Tooltip title="Add Workout">
            <Button
              onClick={() => showBottomSheet(bottomSheetView)}
              data-testid="add-workout-button"
            >
              <AddCircleIcon fontSize="large" sx={{ color: '#CEFF00' }} />
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
          <h1>Workouts</h1>
          <components.WorkoutDisplay />
        </section>
      </div>
      <components.SideBar open={open} handleOpen={handleOpen} user={user} />
      <components.BottomSheet
        bottomSheetView={bottomSheetView}
        showBottomSheet={showBottomSheet}
      />
    </>
  )
}
