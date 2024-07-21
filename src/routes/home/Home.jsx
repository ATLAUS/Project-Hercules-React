import './Home.scss'
import * as components from './components'
// import { useAuth0 } from '@auth0/auth0-react'

export const Home = () => {
  // const { user } = useAuth0()

  return (
    <>
      <main>
        <h1>Home</h1>
        {/* <img src={user.picture} alt="profile-picture" /> */}
        <components.WorkoutDisplay />
      </main>
    </>
  )
}
