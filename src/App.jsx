import './App.scss'
import { Form, Home, Landing, Workout, SavedWorkout, Error } from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, createContext } from 'react'
import { ErrorElement } from './shared/components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/form',
    element: <Form />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/workout',
    element: <Workout />,
    errorElement: <ErrorElement />
  },
  {
    path: '/saved-workout/:workoutID',
    element: <SavedWorkout />
  },
  {
    path: '*',
    element: <Error />
  }
])

export const UserContext = createContext()

export const App = () => {
  const [userData, setUserData] = useState(null)

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
