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
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  )
}
