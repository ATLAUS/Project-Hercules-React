import './App.scss'
import { Form, Home, Landing, Workout, SavedWorkout, Error } from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, createContext } from 'react'
import { ErrorElement, ProtectedRoute } from './shared/components'
import { useAuth0 } from '@auth0/auth0-react'
import { Loader } from './shared/components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/form',
        element: <Form />
      },
      {
        path: '/workout',
        element: <Workout />,
        errorElement: <ErrorElement />
      },
      {
        path: '/saved-workout/:workoutID',
        element: <SavedWorkout />
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
])

export const UserContext = createContext()

export const App = () => {
  const [userData, setUserData] = useState(null)
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <main>
        <UserContext.Provider
          value={{
            userData,
            setUserData
          }}
        >
          <RouterProvider router={router}></RouterProvider>
        </UserContext.Provider>
      </main>
    </>
  )
}
