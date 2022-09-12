import { Navigate } from "react-router-dom";
import { useHistoryTurn } from "../../../../../hooks/hookHistoryTurn";
import { DivContainer, DivContent, DivDown, 
    TabContainer, TabButtons, DivForm, DivControl, ButtonSearch,
    Tab, TabBody, Page, setTableStyles } from "./styles";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { BsSearch } from "react-icons/bs";
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, esES } from '@mui/x-data-grid';

const columnsTurns = [
    { field: 'turn', headerName: 'Turno', flex: 1, mytype: 'string' },
    { field: 'area', headerName: 'Area', flex: 1, mytype: 'string' },
    { field: 'state', headerName: 'Estado', flex: 1, mytype: 'string' },
    { field: 'creationDate', headerName: 'Fecha creación', flex: 1, mytype: 'date' }
];

const columnsTrace = [
    { field: 'turn', headerName: 'Turno', flex: 1, mytype: 'string' },
    { field: 'state', headerName: 'Estado', flex: 1, mytype: 'string' },
    { field: 'username', headerName: 'Atendido por', flex: 1, mytype: 'string' },
    { field: 'startDate', headerName: 'Fecha inicio', flex: 1, mytype: 'date' },
    { field: 'finalDate', headerName: 'Fecha fin', flex: 1, mytype: 'date' },
];

export function HistoryTurn() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const brand = JSON.parse(localStorage.getItem('brand'));
    const [
        trace, turns,
        tab,
        branches,
        idBranchSelected,
        handleChangeBranch,
        handlerChangeTab,
        setTurnSelected,
        date, handlerChangeDate,
        handlerClickSearch
    ] = useHistoryTurn();
    
    return (<>
        {!brand ? <Navigate to="/notFound" replace /> : <>
        <DivContainer>
            <h1>Turnos historicos</h1>
            <DivForm>
                <DivControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idBranchSelected}
                            label="Sucursal"
                            onChange={handleChangeBranch}
                        >
                            {branches.map((b, index) => <MenuItem key={index} value={b.id}>{b.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DivControl>
                <DivControl>
                    <DesktopDatePicker
                        label="Dia"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handlerChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </DivControl>
                <Tooltip title="Buscar">
                    <ButtonSearch color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={handlerClickSearch}>
                        <BsSearch size={20}/>
                    </ButtonSearch>
                </Tooltip>
            </DivForm>
            <DivContent>
                <DivDown>
                    <TabContainer>
                        <TabButtons>
                            <Tab color={brand && brand.color ? brand.color : BACKGROUDCOLOR} selected={tab === 0} onClick={()=>handlerChangeTab(0)}>En proceso</Tab>
                            <Tab color={brand && brand.color ? brand.color : BACKGROUDCOLOR} selected={tab === 1} onClick={()=>handlerChangeTab(1)}>Trazas</Tab>
                        </TabButtons>
                        <TabBody>
                            {tab === 0 ? <Page>
                                <DataGrid sx={setTableStyles(brand && brand.color ? brand.color : BACKGROUDCOLOR)}
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={turns}
                                    columns={columnsTurns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    onSelectionModelChange={(ids) => {
                                        setTurnSelected(ids[0]);
                                    }}
                                />
                            </Page> :
                            <Page>
                                <DataGrid sx={setTableStyles(brand && brand.color ? brand.color : BACKGROUDCOLOR)}
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={trace}
                                    columns={columnsTrace}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                />
                            </Page>}
                        </TabBody>
                    </TabContainer>
                </DivDown>
            </DivContent>
        </DivContainer>
        </>}
    </>);
}