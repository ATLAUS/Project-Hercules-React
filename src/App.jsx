<<<<<<< Updated upstream
import './App.scss'
import { Profile } from './tempProfile'
import * as components from './components'
=======
import './App.css'
import { Root } from './routes/root/Root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
])
>>>>>>> Stashed changes

export const App = () => {
  return (
    <>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  )
}
