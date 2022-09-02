import { RequireAuthSecret } from "../../RequireAuthSecret";
import { DivContainer, DivTakeTurnHeader, TitleTakeTurnHeader, LogoTakeTurnHeader, BranchTakeTurnHeader, DivTakeTurnBody, DivTakeTurnFooter, DivTakeTurnButtons, DivTakeTurnButton, SubTitleTakeTurnBody, SubTitleTakeTurnFooter } from "./styles";
import { useTakeTurn } from "../../../hooks/hookTakeTurn";

export function TakeTurn() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const logo = process.env.PUBLIC_URL + '/logo-aries.png';
    const [
        areas,
        takeTurn,
        branch,
        brand
    ] = useTakeTurn();

    return (
        <RequireAuthSecret>
            <DivContainer>
                <DivTakeTurnHeader color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>
                    <TitleTakeTurnHeader>Hola bienvenido a:</TitleTakeTurnHeader>
                    <LogoTakeTurnHeader src={brand && brand.url ? brand.url : logo} alt="logo"></LogoTakeTurnHeader>
                    <BranchTakeTurnHeader color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>{branch?.name}</BranchTakeTurnHeader>
                </DivTakeTurnHeader>
                <DivTakeTurnBody color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>
                    <SubTitleTakeTurnBody color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>Tome su turno</SubTitleTakeTurnBody>
                    <DivTakeTurnButtons>
                        {areas.map((obj, i) => <DivTakeTurnButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} key={obj.area._id} onClick={() => takeTurn(obj.area._id)}>{obj.area.name}</DivTakeTurnButton>)}
                    </DivTakeTurnButtons>
                </DivTakeTurnBody>
                <DivTakeTurnFooter color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>
                    <SubTitleTakeTurnFooter>Tome su turno del area donde desea ser atendido.</SubTitleTakeTurnFooter>
                </DivTakeTurnFooter>
            </DivContainer>
        </RequireAuthSecret>
    );
};
