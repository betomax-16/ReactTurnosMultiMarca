import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { AreaBranchService } from "../services/areaBranch";
import { TraceService } from "../services/trace";
import { BrandService } from "../services/brand";
import { BranchService } from "../services/branch";
import { useParams } from "react-router-dom";
import { w3cwebsocket } from "websocket";

export const useTakeTurn = () => {
    const [areas, setAreas] = useState([]);
    const [branch, setBranch] = useState(null);
    const [brand, setBrand] = useState(null);

    const [socket, setSocket] = useState(null);
    const [tabHasFocus, setTabHasFocus] = useState(true);
    
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
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

        const token = localStorage.getItem('secret-token');
        if (token) {
            getBrand();
            getAreas();
        }

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (tabHasFocus) {
            if (socket) {
                if (socket.readyState === socket.CLOSED) {
                    connectSocketPrint();
                }
            }
            else {
                connectSocketPrint();
            }
        }
    }, [tabHasFocus])// eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (socket) {
    //         socket.onmessage = function(e) {
    //             if (typeof e.data === 'string') {
    //                 console.log("Received: '" + e.data + "'");
    //             }
    //         };
    //     }
    // }, [socket]);

    const connectSocketPrint = () => {
        const client = new w3cwebsocket(`ws://${window.location.hostname}:4000/?idBranch=${params.idBranch}`);
        client.onopen = function() {
            if (client.readyState === client.OPEN) {
                setSocket(client);   
            }
        };
    }

    const getBrand = async () => {
        try {
            const res = await BrandService.get(params.idBrand);
            setBrand(res.data.body);
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }

    const getAreas = async () => {
        try {
            const resBranch = await BranchService.get(params.idBrand, params.idBranch)
            setBranch(resBranch.data.body);
            const res = await AreaBranchService.getAll(params.idBrand, params.idBranch)
            if (res.data.statusCode === 200) {
                setAreas(res.data.body);    
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }
    
    const takeTurn = async (idArea) => {
        try {
            const res = await TraceService.newTurn(params.idBrand, params.idBranch, { idArea: idArea});            
            const idBrand = res.data.body.brand._id;
            const idBranch = res.data.body.branch._id;
            const data = JSON.stringify(res.data.body);
            sendDataSocket(idBrand, idBranch, data);
            // socket.emit('newTurn', {sucursal:sucursal, data:res.data.body});
            dispatch(setAlertsList([
                {message: 'Turno creado', visible: true, severity: 'success'}
            ]))
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = [];
                error.response.data.body.errors.forEach(e => {
                    errors.push({message: e.msg, visible: true, severity: 'error'});
                });
                dispatch(setAlertsList(errors))
            }
            else {
                dispatch(setAlertsList([
                    {message: error.message, visible: true, severity: 'error'}
                ]))
            }
        }
    }

    const sendDataSocket = (idBrand, idBranch, info) => {
        if (socket && socket.readyState === socket.OPEN) {
            const data = JSON.stringify({
                acction: 'emit',
                method: 'newTurn',
                data: {
                    idBrand: idBrand,
                    idBranch: idBranch,
                    info: info
                }
            });
            socket.send(data);
        }
    };

    return [
        areas,
        takeTurn,
        branch,
        brand
    ];
};