import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SaveDialog } from '../../../../src/routes/workout/components'
import { UserContext } from '../../../../src/App'
import { MemoryRouter } from 'react-router-dom'

const mockUserContextValue = {
  userData: {
    user: {
      _id: '123'
    }
  }
}

const mockWorkoutResponse = {
  workout: {
    _id: '123',
    date: '07/27/24',
    name: 'workout one',
    type: 'Strength Training',
    focusArea: 'Upper'
  }
}

describe('SaveDialog Component', () => {
  test('Should render the SaveDialog component', () => {
    render(
      <UserContext.Provider value={mockUserContextValue}>
        <MemoryRouter>
          <SaveDialog
            open={true}
            handleClose={() => {}}
            workoutResponse={mockWorkoutResponse}
          />
        </MemoryRouter>
      </UserContext.Provider>
    )

    const dialog = screen.getByText(/name your workout/i)
    expect(dialog).toBeInTheDocument()
  })
})
