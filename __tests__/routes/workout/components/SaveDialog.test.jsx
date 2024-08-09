import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SaveDialog } from '../../../../src/routes/workout/components'

describe('SaveDialog Component', () => {
  test('Should render the SaveDialog component', () => {
    render(<SaveDialog open={true} handleClose={() => {}} />)

    const dialog = screen.getByText(/name your workout/i)
    expect(dialog).toBeInTheDocument()
  })
})
