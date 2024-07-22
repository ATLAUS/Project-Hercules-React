import { useState } from 'react'
import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'
import { Drawer } from '@mui/material'

export const Home = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth0()

  const handleOpen = (viewValue) => {
    setOpen(!viewValue)
  }

  return (
    <>
      <div className="home-page">
        <button onClick={() => handleOpen(open)}>Menu</button>
        <Drawer
          className="side-bar"
          open={open}
          PaperProps={{ sx: { width: '45%' } }}
          onClose={() => handleOpen(open)}
        >
          <p>Menu Here</p>
        </Drawer>
        <div className="user-display">
          {!user ? (
            // TODO: Replace with default profile picture.
            <p>Loading...</p>
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
      </div>
    </>
  )
}
