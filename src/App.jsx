import './App.scss'
import * as route from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <route.Landing />
  },
  {
    path: '/form',
    element: <route.Form />
  },
  {
    // TODO: This is a test route to test the Home component.
    path: '/home',
    element: <route.Home />
  },
  {
    path: '/workout',
    element: <route.Workout />
  }
])

export const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
