import './Landing.scss'
import { Profile } from '../../tempProfile'
import * as components from '../../shared/components'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()

  return (
    <>
      <main>
        <h1>Project Hercules</h1>
        <components.LoginButton />
        <div>
          <Profile />
        </div>
        {/* TODO: Is a button to test navigate to the test Home component. */}
        <button onClick={() => navigate('/home')}>Home</button>
      </main>
    </>
  )
}
