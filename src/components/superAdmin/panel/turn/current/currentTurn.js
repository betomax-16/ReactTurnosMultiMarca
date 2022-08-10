import { Navigate } from "react-router-dom";

export function CurrentTurn() {
    const brand = localStorage.getItem('brand');
    return (<>
        {brand ? <h1>Current Turns</h1> : <Navigate to="/notFound" replace />}
    </>);
}