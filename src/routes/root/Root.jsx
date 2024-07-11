import './Root.scss'
import { Profile } from '../../tempProfile'
import * as components from '../../components'

export const Root = () => {
  return (
    <>
      <main>
        <h1>Project Hercules</h1>
        <components.LoginButton />
        <components.LogoutButton />
        <div>
          <Profile />
        </div>
      </main>
    </>
  )
}
