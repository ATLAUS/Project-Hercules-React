import './App.scss'
import * as route from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <route.Root />
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
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  )
}
