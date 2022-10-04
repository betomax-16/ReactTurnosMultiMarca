import { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAlertsList } from '../redux/splices/alertSlice';
import { ReportService } from "../services/reports";
import { BranchService } from "../services/branch";
import { AreaBranchService } from "../services/areaBranch";

const columnsGeneral = [
    { field: 'sucursal', headerName: 'Sucursal', flex: 1 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'shiftsCreated', headerName: 'Turnos creados', flex: 1 },
    { field: 'canceledShifts', headerName: 'Turnos cancelados', flex: 1 },
    { field: 'shiftsFinished', headerName: 'Turnos atendidos', flex: 1 },
    { field: 'averageWaitTime', headerName: 'Promedio tiempo de espera', flex: 1 },
    { field: 'averageAttentionTime', headerName: 'Promedio tiempo de atención', flex: 1 },
    { field: 'averageServiceTime', headerName: 'Promedio tiempo de servicio', flex: 1 },
    { field: 'maxWaitTime', headerName: 'Tiempo máximo de espera', flex: 1 },
    { field: 'maxWaitAttentionTime', headerName: 'Tiempo máximo de atención', flex: 1 }
];

const columnsGeneralByHour = [
    { field: 'time', headerName: 'Hora', flex: 1 },
    { field: 'sucursal', headerName: 'Sucursal', flex: 1 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'shiftsCreated', headerName: 'Turnos creados', flex: 1 },
    { field: 'canceledShifts', headerName: 'Turnos cancelados', flex: 1 },
    { field: 'shiftsFinished', headerName: 'Turnos atendidos', flex: 1 },
    { field: 'averageWaitTime', headerName: 'Promedio tiempo de espera', flex: 1 },
    { field: 'averageAttentionTime', headerName: 'Promedio tiempo de atención', flex: 1 },
    { field: 'averageServiceTime', headerName: 'Promedio tiempo de servicio', flex: 1 },
    { field: 'maxWaitTime', headerName: 'Tiempo máximo de espera', flex: 1 },
    { field: 'maxWaitAttentionTime', headerName: 'Tiempo máximo de atención', flex: 1 }
];

const columnsDetail = [
    { field: 'sucursal', headerName: 'Sucursal', flex: 1 },
    { field: 'turn', headerName: 'Turno', flex: 1 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'date', headerName: 'Fecha', flex: 1 },
    { field: 'module', headerName: 'Puesto', flex: 1 },
    { field: 'user', headerName: 'Usuario', flex: 1 },
    { field: 'beginningTime', headerName: 'Hora de emisión', flex: 1 },
    { field: 'callingTime', headerName: 'Hora de llamado', flex: 1 },
    { field: 'endingTime', headerName: 'Hora final de atención', flex: 1 },
    { field: 'waitTime', headerName: 'Tiempo de espera', flex: 1 },
    { field: 'attentionTime', headerName: 'Tiempo de atención', flex: 1 }
];

export const useReports = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const onSubmit = data => getData(data);

    const [data, setData] = useState([]);
    const [dataAux, setDataAux] = useState({
        general: [],
        generalIntervalTime: [],
        detail: []
    });

    const [showLoading, setShowLoading] = useState(false);
    const [columns, setColumns] = useState(columnsGeneral);
    const [selectOptionReport, setSelectOptionReport] = useState('General');

    const [branches, setBranches] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        getBranches();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (event) => {
        const option = event.target.value;
        setSelectOptionReport(option);

        if (option === 'General') {
            setColumns(columnsGeneral);
            setData(dataAux.general);
        }
        else if (option === 'GeneralByHour') {
            setColumns(columnsGeneralByHour);
            setData(dataAux.generalIntervalTime);
        }
        else if (option === 'Detail') {
            setColumns(columnsDetail);
            setData(dataAux.detail);
        }
    };

    const getData = async (data) => {
        try {
            if (moment(data.starDate).isValid() && moment(data.finalDate).isValid()) {
                setShowLoading(true);
                const startDate = moment(data.startDate);
                const finalDate = moment(data.finalDate);
                const req = {
                    startDate: startDate.format('YYYY-MM-DD'),
                    finalDate: finalDate.format('YYYY-MM-DD'),
                    sucursal: data.sucursal,
                    area: data.area
                };

                let query = `startDate=${req.startDate}&finalDate=${req.finalDate}`;
                if (req.sucursal && req.sucursal !== '') {
                    query += `&idBranch=${req.sucursal}`;
                }

                if (req.area && req.area !== '') {
                    query += `&idArea=${req.area}`;
                }

                const res = await ReportService.get(selectOptionReport.toLowerCase(), params.idBrand, query);
                    
                const rows = [];
                if (res.data.body.length) {
                    for (let index = 0; index < res.data.body.length; index++) {
                        const row = res.data.body[index];
                        rows.push({
                            id: index,
                            sucursal: row.branch?.name,
                            ...row
                        });
                    }
                }

                const copyDataAux = {...dataAux};
                copyDataAux[selectOptionReport.toLowerCase()] = rows;

                setDataAux(copyDataAux);
                setData(rows);
                setShowLoading(false);
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

    const getBranches = async () => {
        try {
            const res = await BranchService.getAll(params.idBrand);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row._id,
                    name: row.name, 
                    color: row.color,
                    timeLimit: row.timeLimit
                });
            });
            setBranches(rows);
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

    const handleChangeBranch = (event) => {
        const option = event.target.value;
        getAreas(option);
    };

    const getAreas = async (idBranch) => {
        try {
            const res = await AreaBranchService.getAll(params.idBrand, idBranch);
            const rows = [];
            res.data.body.forEach(row => {
                rows.push({
                    id: row.area._id,
                    name: row.area.name
                });
            });
            setAreas(rows);
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

    return [
        data,
        showLoading,
        columns,
        selectOptionReport,
        handleChange,
        onSubmit,
        handleChangeBranch,
        branches,
        areas
    ];
};