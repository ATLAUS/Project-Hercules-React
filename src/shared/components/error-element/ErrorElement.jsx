import { useNavigate } from "react-router-dom"

export const ErrorElement = () => {
    const navigate = useNavigate()

    return(
        <>
            <p>Error</p>
            <button onClick={() => navigate("/form")}>Back to form</button>
        </>
    )
}