import './SideBar.scss'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Tooltip
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'

export const SideBar = ({ open, handleOpen, user }) => {
  return (
    <>
      <Drawer
        className="side-bar"
        open={open}
        PaperProps={{ sx: { width: '45%' } }}
        onClose={() => handleOpen(open)}
      >
        <div className="side-bar-title">
          {!user ? <h2>Welcome Chravis</h2> : <h2>Welcome {user.name}</h2>}
        </div>
        <List className="side-bar-items">
          {['Generate Workout'].map((text, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton data-testid="add-workout-button">
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
