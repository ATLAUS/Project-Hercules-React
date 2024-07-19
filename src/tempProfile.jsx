// TODO: Delete before deployment.
// This is a temporary profile component to test the auth0 authentication and authorization.

import { useAuth0 } from '@auth0/auth0-react'
import { fetchUserDetails } from './services/fetchUserDetails'

export const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()

  const testFetch = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'http://localhost:3001'
        }
      })

      const response = await fetchUserDetails(accessToken, user)
      console.log(response)
    } catch (err) {
      console.log(err.message)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <button onClick={testFetch}>Test Fetch</button>
        </div>
      </div>
    )
  )
}
