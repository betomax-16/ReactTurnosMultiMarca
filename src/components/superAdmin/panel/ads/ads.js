import { Navigate } from "react-router-dom";

export function Ad() {
    const brand = localStorage.getItem('brand');
    return (<>
        {brand ? <h1>Ads</h1> : <Navigate to="/notFound" replace />}
    </>);
}