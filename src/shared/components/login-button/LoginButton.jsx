import { useAuth0 } from '@auth0/auth0-react'
import './LoginButton.scss'

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <>
      <button className="btn" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </>
  )
}