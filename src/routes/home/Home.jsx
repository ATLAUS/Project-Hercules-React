import { useState } from 'react'
import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Drawer,
  Button,
  Avatar,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import AddIcon from '@mui/icons-material/Add'

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
          <Tooltip title="Menu">
            <Button onClick={() => handleOpen(open)} data-testid="menu-button">
              <MenuIcon sx={{ color: '#CEFF00' }} />
            </Button>
          </Tooltip>
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
          <div className="side-bar-title">
            {!user ? <h2>Welcome Chravis</h2> : <h2>{user.name}</h2>}
          </div>
          <List className="side-bar-items">
            {['Generate Workout'].map((text, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className="side-bar-footer">
            <Tooltip title="Logout">
              <Button color="error">
                <LogoutIcon />
              </Button>
            </Tooltip>
          </div>
        </Drawer>
      </div>
    </>
  )
}
