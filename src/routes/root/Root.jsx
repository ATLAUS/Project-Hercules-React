import './Root.scss'
import { Profile } from '../../tempProfile'
import * as components from '../../components'
import { useNavigate } from 'react-router-dom'

export const Root = () => {
  const navigate = useNavigate()

  return (
    <>
      <main>
        <h1>Project Hercules</h1>
        <components.LoginButton />
        <components.LogoutButton />
        <div>
          <Profile />
        </div>
        {/* TODO: Is a button to test navigate to the test Home component. */}
        <button onClick={() => navigate('/home')}>Home</button>
      </main>
    </>
  )
}
