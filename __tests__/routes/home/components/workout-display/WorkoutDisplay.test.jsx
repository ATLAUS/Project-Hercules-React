import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import { WorkoutDisplay } from '../../../../../src/routes/home/components/'

describe('WorkoutDisplay component with no workouts', () => {
  test('should render no workouts message', () => {
    render(<WorkoutDisplay workouts={null} />)

    const workoutDisplay = screen.getByText(/no workouts to display./i)
    expect(workoutDisplay).toBeInTheDocument()
  })
})

describe('WorkoutDisplay component with workouts', () => {
  const workouts = [
    { _id: 1, date: '07/27/24', type: 'Strength Training', focus: 'Upper' },
    { _id: 2, date: '07/29/24', type: 'Strength Training', focus: 'Lower' },
    { _id: 3, date: '08/01/24', type: 'Strength Training', focus: 'Upper' },
    { _id: 4, date: '08/01/24', type: 'Strength Training', focus: 'Upper' }
  ]

  test('should render workout cards', () => {
    render(<WorkoutDisplay workouts={workouts} />)

    const workoutCardsArray = screen.getAllByTestId('workout-card')
    expect(workoutCardsArray.length).toBe(workouts.length)
    //TODO: Add more assertions here.
  })
})
