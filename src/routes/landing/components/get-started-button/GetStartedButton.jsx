import './GetStartedButton.scss'
import { useAuth0 } from '@auth0/auth0-react'

export const GetStartedButton = () => {
    const { loginWithRedirect } = useAuth0()
    
    return (
        <>
         <button className='button' onClick={() => loginWithRedirect()}>GET STARTED</button>
         <div className='prompt-string'>
            <span className='text'>ALREADY HAVE AN ACCOUNT? </span>
            <span className='login-text' onClick={() => loginWithRedirect()}>LOGIN</span>
         </div>
        </>
    )
}