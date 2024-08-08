import './SideBar.scss'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

export const SideBar = ({ open, handleOpen, user }) => {
  const navigate = useNavigate()

  const navigateToFormPage = () => {
    navigate('/form')
  }

  return (
    <>
      <Drawer
        className="side-bar"
        open={open}
        PaperProps={{ sx: { width: '60%' } }}
        onClose={() => handleOpen(open)}
      >
        <div className="side-bar-title">
          {!user ? <h2>Welcome Chravis</h2> : <h2>Welcome {user.name}</h2>}
        </div>
        <List className="side-bar-items">
          {['Generate Workout'].map((text, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                data-testid="sidebar-add-workout-button"
                onClick={navigateToFormPage}
              >
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
            <Button color="error" data-testid="logout-button">
              <LogoutIcon />
            </Button>
          </Tooltip>
        </div>
      </Drawer>
    </>
  )
}
