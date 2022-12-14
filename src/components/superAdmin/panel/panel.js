import { RequireAuth } from "../../RequireAuth";
import { Menu } from "./menu/menu";
import { Routes, Route, Navigate } from "react-router-dom";
import { DivContainer, DivLeft, DivRight } from "./styles";
import { loadCurrentUser } from "../../../redux/splices/currentUserSlice";
import { useEffect } from "react";

export function Panel({ routes }) {
    useEffect(() => {
        loadCurrentUser();
    }, []);

    return (
        <RequireAuth>
            <DivContainer>
                <DivLeft>
                    <Menu/>
                </DivLeft>
                <DivRight>
                    <Routes>
                        {routes && routes.map((route, i) => {
                            // const props = {...route.props, socket: socket};
                            return <Route key={i}
                                path={route.path}
                                element={<route.component {...route.props} routes={route.routes}/>}
                            />
                        })}
                        <Route path="*" element={<Navigate to="/notFound" replace />}/>
                    </Routes>
                </DivRight>
            </DivContainer>
        </RequireAuth>
    );
}