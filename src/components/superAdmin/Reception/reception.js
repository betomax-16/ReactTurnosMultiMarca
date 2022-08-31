import { RequireAuth } from "../../RequireAuth";
import { TopMenu } from "./TopMenu/topMenu";
import { useReception } from "../../../hooks/hookReception";
import { DivContainer, DivContentGreeting, GreetingTitle } from "./styles";

export function Reception() {
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
        storeValues
    ] = useReception();

    return(
        <RequireAuth>
            <DivContainer>
                <TopMenu storeValues={storeValues} selectModule={selectModule} modules={modules} 
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
                {/* {module && <>
                <DivContent>
                    <Attend areas={areas} currentTurn={currentTurn} socket={socket}
                            setAreas={setAreas}
                            handlerAttendTurn={handlerAttendTurn}
                            handlerAttendedTurn={handlerAttendedTurn}
                            handlerCancelationTurn={handlerCancelationTurn}
                            handlerReCallTurn={handlerReCallTurn}/>
                    <DivContentBody>
                        <TurnList date={dateState} currentTurn={currentTurn} lastTurns={lastTurns}/>
                    </DivContentBody>
                </DivContent>
                </>} */}
                {user && !storeValues.module &&
                <DivContentGreeting>
                    <GreetingTitle color={brand && brand.color ? brand.color : '#5a8f80'}>Hola {user.name}!</GreetingTitle>
                </DivContentGreeting>
                }
            </DivContainer>
        </RequireAuth>
    );
}