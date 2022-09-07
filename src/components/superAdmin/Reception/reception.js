import { RequireAuth } from "../../RequireAuth";
import { TopMenu } from "./TopMenu/topMenu";
import { useReception } from "../../../hooks/hookReception";
import { DivContainer, DivContentGreeting, GreetingTitle, DivContent, DivContentBody } from "./styles";
import { LateralMenu } from "./LateralMenu/lateralMenu";
import { TurnList } from "../../secretCodeBranch/screen/turnList/turnList";

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
        sesion
    ] = useReception();

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
                    <LateralMenu color={brand && brand.color ? brand.color : '#5a8f80'}/>
                    <DivContentBody>
                        <TurnList color={brand && brand.color ? brand.color : '#5a8f80'} turn={sesion.currentTurn?.turn} ubication={sesion.currentTurn?.ubication}/>
                    </DivContentBody>
                </DivContent>}
                {user && !sesion.module &&
                <DivContentGreeting>
                    <GreetingTitle color={brand && brand.color ? brand.color : '#5a8f80'}>Hola {user.name}!</GreetingTitle>
                </DivContentGreeting>}
            </DivContainer>
        </RequireAuth>
    );
}