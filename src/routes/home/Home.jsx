import './Home.scss'
import * as components from './components'
import { useState, useEffect, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { UserContext } from '../../App'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import { fetchUserDetails } from '../../services/UserService'

export const Home = () => {
  const [workouts, setWorkouts] = useState(null)
  const [open, setOpen] = useState(false)
  const [bottomSheetView, setBottomSheetView] = useState(false)
  const { setUserData } = useContext(UserContext)
  const { user, getAccessTokenSilently } = useAuth0()

  const fetchUserData = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE || 'http://localhost:3001'
        }
      })

      const response = await fetchUserDetails(accessToken, user)

      if (response.user.workouts > 0) {
        setWorkouts(response.user.workouts)
      }

      setUserData(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpen = (viewValue) => {
    setOpen(!viewValue)
  }

  const showBottomSheet = (bottomSheetView) => {
    setBottomSheetView(!bottomSheetView)
  }

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  return (
    <>
      <div className="home-page">
        {/* TODO: Nav should be sticky. */}
        <nav className="nav">
          <Tooltip title="Menu">
            <Button onClick={() => handleOpen(open)} data-testid="menu-button">
              <MenuIcon fontSize="large" sx={{ color: '#efefef' }} />
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
          <h1 className="workouts-title">WORKOUTS</h1>
          <components.WorkoutDisplay workouts={workouts} />
        </section>
        <Fab
          onClick={() => showBottomSheet(bottomSheetView)}
          aria-label="add"
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            backgroundColor: '#efefef',
            color: '#0167ff'
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
