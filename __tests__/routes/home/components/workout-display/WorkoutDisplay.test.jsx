import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { WorkoutDisplay } from '../../../../../src/routes/home/components/'

describe('WorkoutDisplay component', () => {
  {
    test('should render no workouts message', () => {
      render(<WorkoutDisplay workouts={null} />)

      const workoutDisplay = screen.getByText(/no workouts to display./i)
      expect(workoutDisplay).toBeInTheDocument()
    })
  }
})
