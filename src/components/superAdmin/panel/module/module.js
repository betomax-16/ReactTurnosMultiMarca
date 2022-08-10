import { Navigate } from "react-router-dom";

export function Module() {
    const brand = localStorage.getItem('brand');
    return (<>
        {brand ? <h1>Modules</h1> : <Navigate to="/notFound" replace />}
    </>);
}