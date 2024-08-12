import './App.scss'
import { Form, Home, Landing, Workout, SavedWorkout } from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, createContext } from 'react'

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
    element: <Workout />
  },
  {
    path: '/saved-workout/:workoutID',
    element: <SavedWorkout />
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
