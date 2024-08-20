import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AddExerciseBottomSheet } from '../../../../src/routes/workout/components'

describe('AddExerciseBottomSheet component', () => {
  test('should render the AddExerciseBottomSheet component', () => {
    render(<AddExerciseBottomSheet bottomSheetView={true} />)

    const bottomSheetTitle = screen.getByText(/add exercise/i)
    expect(bottomSheetTitle).toBeInTheDocument()
  })
})
