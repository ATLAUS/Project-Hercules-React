import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'

export const Home = () => {
  const { user } = useAuth0()

  return (
    <>
      <main>
        <h1>Home</h1>
        {!user ? (
          <p>Loading...</p>
        ) : (
          <img src={user.picture} alt="profile-picture" />
        )}

        <components.WorkoutDisplay />
      </main>
    </>
  )
}
