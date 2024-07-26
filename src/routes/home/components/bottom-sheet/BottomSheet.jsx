import './BottomSheet.scss'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'

export const BottomSheet = ({ bottomSheetView, showBottomSheet }) => {
  return (
    <>
      <Drawer
        className="bottom-sheet"
        open={bottomSheetView}
        anchor="bottom"
        PaperProps={{
          sx: {
            height: '60%',
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
