import './Home.scss'
import * as components from './components'
import { useAuth0 } from '@auth0/auth0-react'

export const Home = () => {
  const { user } = useAuth0()

  return (
    <>
      <main className="home-page">
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
      </main>
    </>
  )
}
