import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { WorkoutDisplay } from '../../../../../src/routes/home/components/'

describe('WorkoutDisplay component', () => {
  {
    test('should render workout display', () => {
      render(<WorkoutDisplay />)

      const workoutDisplay = screen.getByText(/Workout display goes here/i)
      expect(workoutDisplay).toBeInTheDocument()
    })
  }
})
