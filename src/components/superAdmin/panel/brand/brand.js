import { Navigate } from "react-router-dom";
import { useBrand } from "../../../../hooks/hookBrand";

export function Brand() {
    const [brand] = useBrand();

    return (<>
        {!brand ? <h1>Brands</h1> : <Navigate to="/notFound" replace />}
    </>);
}