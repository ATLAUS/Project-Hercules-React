import { useState } from 'react'
import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'
import { Drawer, Button, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export const Home = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth0()

  const handleOpen = (viewValue) => {
    setOpen(!viewValue)
  }

  return (
    <>
      <div className="home-page">
        <section className="nav">
          <Button onClick={() => handleOpen(open)} data-testid="menu-button">
            <MenuIcon sx={{ color: '#CEFF00' }} />
          </Button>
        </section>
        <section className="content">
          <div className="user-display">
            {!user ? (
              // TODO: Pass username as child to display their name.
              <Avatar alt="user-avatar" sx={{ width: 56, height: 56 }}></Avatar>
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

        <Drawer
          className="side-bar"
          open={open}
          PaperProps={{ sx: { width: '45%' } }}
          onClose={() => handleOpen(open)}
        >
          <p>Menu Content Here</p>
        </Drawer>
      </div>
    </>
  )
}
