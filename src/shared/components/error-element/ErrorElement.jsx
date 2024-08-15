import './ErrorElement.scss'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';



export const ErrorElement = () => {
    const navigate = useNavigate()

    return(
        <section className='error-page'>
            <div className='error-content'>
                <h1 className='error-title'>ERROR</h1>
                <div className='error-message-display'>
                    <h2 className='error-status'>500</h2>
                    <p className='error-message'>There was an error generating your workout</p>
                </div>
            </div>
            <div className='error-control'>
                    <Button 
                        onClick={() => navigate("/form")}
                        variant='contained'
                        style={{
                            backgroundColor:'#E97451',
                            color:'white',
                            borderRadius: 10
                        }}
                        disableElevation
                    >
                        Back to form
                    </Button>
            </div>
        </section>
    )
}