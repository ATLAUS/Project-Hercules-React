// TODO: Delete before deployment.
// This is a temporary profile component to test the auth0 authentication and authorization.

import { useAuth0 } from '@auth0/auth0-react'

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

      const testResponse = await fetch('http://localhost:3001/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const json = await testResponse.json()
      console.log(json)
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
