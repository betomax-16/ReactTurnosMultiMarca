import { Navigate } from "react-router-dom";

export function HistoryTurn() {
    const brand = localStorage.getItem('brand');
    return (<>
        {brand ? <h1>History Turns</h1> : <Navigate to="/notFound" replace />}
    </>);
}