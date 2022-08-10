import { Navigate } from "react-router-dom";

export function Area() {
    const brand = localStorage.getItem('brand');
    return (<>
        {brand ? <h1>Areas</h1> : <Navigate to="/notFound" replace />}
    </>);
}