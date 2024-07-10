import './App.css'
import * as components from './components'
import { Profile } from './tempProfile'

export const App = () => {
  return (
    <>
      <h1>Project Hercules</h1>
      <components.LoginButton />
      <components.LogoutButton />
      <div>
        <Profile />
      </div>
    </>
  )
}
