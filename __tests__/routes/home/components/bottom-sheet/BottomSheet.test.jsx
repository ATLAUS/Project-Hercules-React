import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomSheet } from '../../../../../src/routes/home/components'

describe('BottomSheet component', () => {
  test('renders the component', () => {
    const showBottomSheet = vi.fn()
    render(
      <BottomSheet bottomSheetView={true} showBottomSheet={showBottomSheet} />
    )

    const bottomSheetTitle = screen.getByText(/generate a workout/i)
    expect(bottomSheetTitle).toBeInTheDocument()
  })
})