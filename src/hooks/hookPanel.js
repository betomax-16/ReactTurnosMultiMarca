import { loadCurrentUser } from "../redux/splices/currentUserSlice";
import { useEffect, useState, useContext } from "react";
import { useDispatch } from 'react-redux';
import { setSocketResponse } from "../redux/splices/socketResponseSlice";
import { w3cwebsocket } from "websocket";
import AppContext from "../context/app-context";

export function usePanel() {
    const [tabHasFocus, setTabHasFocus] = useState(true);
    const { setSocket, socket } = useContext(AppContext);
    const dispatch = useDispatch();

    useEffect(() => {
        loadCurrentUser();
        const handleFocus = () => {
            // console.log('Tab has focus');
            setTabHasFocus(true);
        };
    
        const handleBlur = () => {
            // console.log('Tab lost focus');
            setTabHasFocus(false);
        };
    
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (tabHasFocus) {
            if (socket) {
                if (socket.readyState === socket.CLOSED) {
                    connectSocket();
                }
            }
            else {
                connectSocket();
            }
        }
    }, [tabHasFocus])// eslint-disable-line react-hooks/exhaustive-deps

    const connectSocket = () => {
        const client = new w3cwebsocket(`ws://${window.location.hostname}:4000/`);
        client.onopen = function() {
            if (client.readyState === client.OPEN) {
                setSocket(client);   
            }
        };
        client.onmessage = function(e) {
            if (typeof e.data === 'string') {
                const response = JSON.parse(e.data);
                response.info = JSON.parse(response.info);
                dispatch(setSocketResponse(response));
            }
        };
    }

    return [];
}