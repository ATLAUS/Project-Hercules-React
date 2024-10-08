import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../../../src/routes/home/Home'
import { UserContext } from '../../../src/App'

const mockUserContextValue = {
  setUserData: vi.fn()
}

describe('Home page component with a user defined', () => {
  vi.mock('../../../src/services/UserService', () => ({
    fetchUserDetails: vi.fn().mockResolvedValue({
      user: {
        _id: '123',
        email: 'test@email.com',
        nickname: 'test user',
        userId: '123',
        workouts: [
          {
            _id: '123',
            name: 'test workout',
            type: 'strength',
            focusArea: 'upper'
          },
          {
            _id: '456',
            name: 'test workout 2',
            type: 'body',
            focusArea: 'lower'
          }
        ]
      }
    })
  }))

  vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
      user: {
        name: 'Chravis',
        picture: 'https://example.com/profile-picture.png'
      },
      getAccessTokenSilently: vi.fn().mockResolvedValue('access-token')
    })
  }))

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render home page', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={['/home']}>
          <Home />
        </MemoryRouter>
      </UserContext.Provider>
    )
    await waitFor(() => {
      const homeText = screen.getByRole('heading', { name: /workouts/i })
      expect(homeText).toBeInTheDocument()
    })
  })

  test('should render profile picture', async () => {
    render(
      <UserContext.Provider value={{ setUserData: vi.fn() }}>
        <MemoryRouter initialEntries={['/home']}>
          <Home />
        </MemoryRouter>
      </UserContext.Provider>
    )
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })

  // TODO: Implement this test.
  // test('should not render the side bar or bottom sheet by default', () => {

  // })

  test('should open the side bar', async () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter initialEntries={['/home']}>
          <Home />
        </MemoryRouter>
      </UserContext.Provider>
    )

    await waitFor(() => {
      const menuButton = screen.getByTestId('menu-button')
      menuButton.click()
    })

    await waitFor(() => {
      expect(screen.getByText(/welcome chravis/i)).toBeInTheDocument()
      expect(
        screen.getByTestId('sidebar-add-workout-button')
      ).toBeInTheDocument()
      expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    })
  })

  // TODO: Implement this test.
  // test('should hide the side bar', async () => {

  // })

  // TODO: Bring this back in when the form is added to the bottom sheet.
  // test('should open the bottom sheet', async () => {
  //   render(
  //     <UserContext.Provider value={mockUserContextValue}>
  //       <MemoryRouter initialEntries={['/home']}>
  //         <Home />
  //       </MemoryRouter>
  //     </UserContext.Provider>
  //   )

  //   const addWorkoutButton = screen.getByTestId('add-workout-fab')
  //   addWorkoutButton.click()

  //   await waitFor(() => {
  //     expect(screen.getByText(/generate a workout/i)).toBeInTheDocument()
  //   })
  // })

  // TODO: Implement this test.
  // test('should hide the bottom sheet', async () => {

  // })
})
