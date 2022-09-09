import { RequireAuth } from "../../RequireAuth";
import { TopMenu } from "../Reception/TopMenu/topMenu";
import { useSupervisorReception } from "../../../hooks/hookSupervisorReception";
import { DivContainer, DivContentGreeting, GreetingTitle, DivContent,
        DivUp, UpTitle, DivDown, DownTitle, TabContainer, TabButtons,
        Tab, TabBody, UpList, Page
     } from "./styles";
import { ModuleCard } from "./moduleCard/moduleCard";
import { DataGrid, esES } from '@mui/x-data-grid';

const columnsTurns = [
    { field: 'turn', headerName: 'Turno', flex: 1, mytype: 'string' },
    { field: 'area', headerName: 'Area', flex: 1, mytype: 'string' },
    { field: 'sucursal', headerName: 'Sucursal', flex: 1, mytype: 'string' },
    { field: 'state', headerName: 'Estado', flex: 1, mytype: 'string' },
    { field: 'creationDate', headerName: 'Fecha creación', flex: 1, mytype: 'date' }
];

const columnsTrace = [
    { field: 'turn', headerName: 'Turno', flex: 1, mytype: 'string' },
    { field: 'sucursal', headerName: 'Sucursal', flex: 1, mytype: 'string' },
    { field: 'state', headerName: 'Estado', flex: 1, mytype: 'string' },
    { field: 'username', headerName: 'Atendido por', flex: 1, mytype: 'string' },
    { field: 'startDate', headerName: 'Fecha inicio', flex: 1, mytype: 'date' },
    { field: 'finalDate', headerName: 'Fecha fin', flex: 1, mytype: 'date' },
];

export function Supervisor() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const brand = JSON.parse(localStorage.getItem('brand'));
    const [
        user,

        // TopMenu
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
        sesion,


        slaveModules, tab,
        trace, turns,
        handlerChangeTab,
        setTurnSelected
    ] = useSupervisorReception();

    return(
        <RequireAuth>
            <DivContainer>
                <TopMenu showOnlyTitle={false} sesion={sesion} selectModule={selectModule} modules={modules} 
                        selectBranch={selectBranch} sucursals={branches}
                        openSubMenu={openSubMenu} isBranch={isBranch}
                        handlerOnClickOpenBranch={handlerOnClickOpenBranch}
                        handlerOnClickOpenModule={handlerOnClickOpenModule}
                        handlerOnClickChangeBranch={handlerOnClickChangeBranch}
                        handlerOnClickChangeModule={handlerOnClickChangeModule}
                        handlerLogout={handlerLogout} anchorEl={anchorEl}
                        handlerCloseSubMenu={handlerCloseSubMenu}
                        valueSelect={valueSelect} valuesItemList={valuesItemList}
                        handlerChangeSelectValue={handlerChangeSelectValue}
                        handlerSelectValue={handlerSelectValue}/>
                {user && sesion.module &&
                <DivContent>
                    <DivUp>
                        <UpTitle color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>Modulos</UpTitle>
                        <UpList>
                            {slaveModules.map((element, index) => <ModuleCard key={index} color={brand && brand.color ? brand.color : BACKGROUDCOLOR} data={element} clic={() => {
                            //    freeModule(element.name, currentSucursal);
                            }}/>)}
                        </UpList>
                    </DivUp>
                    <DivDown color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>
                        <DownTitle color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>Turnos</DownTitle>
                        <TabContainer>
                            <TabButtons>
                                <Tab color={brand && brand.color ? brand.color : BACKGROUDCOLOR} selected={tab === 0} onClick={()=>handlerChangeTab(0)}>En proceso</Tab>
                                <Tab color={brand && brand.color ? brand.color : BACKGROUDCOLOR} selected={tab === 1} onClick={()=>handlerChangeTab(1)}>Trazas</Tab>
                            </TabButtons>
                            <TabBody>
                                {tab === 0 ? <Page>
                                    <DataGrid
                                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                        rows={turns}
                                        columns={columnsTurns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        
                                        onSelectionModelChange={(ids) => {
                                            setTurnSelected(ids[0]);
                                        }}
                                        getRowClassName={(params) => {
                                            // console.log(params);
                                            // return params.row.limit && (params.row.state === 'espera' || params.row.state === 'espera toma') ? `super-app-theme ` : '';
                                        }}
                                    />
                                </Page> :
                                <Page>
                                    <DataGrid
                                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                        rows={trace}
                                        columns={columnsTrace}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        disableSelectionOnClick
                                        onSelectionModelChange={(ids) => {
                                            // console.log(ids[0]);
                                        }}
                                    />
                                </Page>}
                            </TabBody>
                        </TabContainer>
                    </DivDown>
                </DivContent>}
                {user && !sesion.module &&
                <DivContentGreeting>
                    <GreetingTitle color={brand && brand.color ? brand.color : '#5a8f80'}>Hola {user.name}!</GreetingTitle>
                </DivContentGreeting>}
            </DivContainer>
        </RequireAuth>
    );
}