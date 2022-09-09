import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser } from "../redux/splices/currentUserSlice";
import { useTopMenuReception } from "./hookTopMenuReception";

export const useSupervisorReception = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUser.user);

    const [
        branches, modules, isBranch,
        selectBranch, selectModule,
        valueSelect, valuesItemList,
        handlerOnClickOpenBranch,
        handlerOnClickOpenModule,
        handlerOnClickChangeBranch,
        handlerOnClickChangeModule,
        handlerChangeSelectValue,
        handlerSelectValue,
        openSubMenu, anchorEl,
        handlerCloseSubMenu,
        handlerLogout,
        sesion
    ] = useTopMenuReception();

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return [
        user,
        
        branches, modules, isBranch,
        selectBranch, selectModule,
        valueSelect, valuesItemList,
        handlerOnClickOpenBranch,
        handlerOnClickOpenModule,
        handlerOnClickChangeBranch,
        handlerOnClickChangeModule,
        handlerChangeSelectValue,
        handlerSelectValue,
        openSubMenu, anchorEl,
        handlerCloseSubMenu,
        handlerLogout, 
        sesion
    ];
};