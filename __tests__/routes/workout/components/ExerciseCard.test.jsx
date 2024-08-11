import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExerciseCard } from '../../../../src/routes/workout/components'

describe('ExerciseCard Component', () => {
  test('renders exercise card', () => {
    const mockExercise = {
      name: 'Pushups',
      reps: 10,
      sets: 3
    }

    render(<ExerciseCard exercise={mockExercise} />)

    const exerciseName = screen.getByTestId('exercise-card-name')
    const exerciseRep = screen.getByTestId('exercise-card-rep')
    const exerciseSet = screen.getByTestId('exercise-card-set')
    const moreOptionsButton = screen.getByTestId('more-options-btn')

    expect(exerciseName).toHaveTextContent('Pushups')
    expect(exerciseRep).toHaveTextContent('R: 10')
    expect(exerciseSet).toHaveTextContent('S: 3')
    expect(moreOptionsButton).toBeInTheDocument()
  })
})
