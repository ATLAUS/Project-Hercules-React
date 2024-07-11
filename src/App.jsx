import './App.scss'
import * as route from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <route.Landing />
  },
  {
    // TODO: This is a test route to test the Home component.
    path: '/home',
    element: <div>Home page goes here</div>
  }
])

export const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
