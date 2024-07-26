import './BottomSheet.scss'
import { Drawer, Divider } from '@mui/material'

export const BottomSheet = ({ bottomSheetView, showBottomSheet }) => {
  return (
    <>
      <Drawer
        className="bottom-sheet"
        open={bottomSheetView}
        anchor="bottom"
        PaperProps={{
          sx: {
            height: '40%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }
        }}
        onClose={() => showBottomSheet(bottomSheetView)}
      >
        <div className="bottom-sheet-title">
          <h2>Generate a workout</h2>
        </div>
        <div className="bottom-sheet-content">
          <p>Buttons go here</p>
          <Divider />
          <p>Buttons go here</p>
        </div>
      </Drawer>
    </>
  )
}
