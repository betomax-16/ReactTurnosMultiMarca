import { RequireAuth } from "../../RequireAuth";
import { TopMenu } from "../Reception/TopMenu/topMenu";
import { useSupervisorReception } from "../../../hooks/hookSupervisorReception";
import { DivContainer, DivContentGreeting, GreetingTitle, DivContent } from "./styles";

export function Supervisor() {
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
        sesion
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
                    {/* <div className="up">
                        <span className="title">Modulos</span>
                        <div className="list">
                            {slaveModules.map((element, index) => <ModuleCard key={index} data={element} clic={() => {
                               freeModule(element.name, currentSucursal);
                            }}/>)}
                        </div>
                    </div>
                    <div className="down">
                        <span className="title">Turnos</span>
                        <div className="tab-container">
                            <div className="tab-buttons">
                                <div className={tab === 0 ? 'tab select' : 'tab'} onClick={()=>handlerChangeTab(0)}>En proceso</div>
                                <div className={tab === 1 ? 'tab select' : 'tab'} onClick={()=>handlerChangeTab(1)}>Trazas</div>
                            </div>
                            <div className="tab-body">
                                {tab === 0 ? <div className="page">
                                    <DataGrid
                                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                        rows={turns}
                                        columns={columnsTurns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        disableSelectionOnClick
                                        onSelectionModelChange={(ids) => {
                                            console.log(ids[0]);
                                        }}
                                        getRowClassName={(params) => {
                                            return params.row.limit && (params.row.state === 'espera' || params.row.state === 'espera toma') ? `super-app-theme ` : '';
                                        }}
                                    />
                                </div> :
                                <div className="page">
                                <DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    rows={trace}
                                    columns={columnsTrace}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                    onSelectionModelChange={(ids) => {
                                        console.log(ids[0]);
                                    }}
                                />
                            </div>}
                            </div>
                        </div>
                    </div> */}
                </DivContent>}
                {user && !sesion.module &&
                <DivContentGreeting>
                    <GreetingTitle color={brand && brand.color ? brand.color : '#5a8f80'}>Hola {user.name}!</GreetingTitle>
                </DivContentGreeting>}
            </DivContainer>
        </RequireAuth>
    );
}