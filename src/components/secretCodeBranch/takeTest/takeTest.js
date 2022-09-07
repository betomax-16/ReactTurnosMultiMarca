import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { FiSearch } from "react-icons/fi";
import { DivContainer, DivContent, DivBody, 
         DivAreaContent, DivAreaTitle, DivAreaTextSearch,
         DivAreaBody, DivAreaBodyGrid, DivMessage, MessageTitle } from "./styles";
import { RequireAuthSecret } from "../../RequireAuthSecret";
import { TurnCard } from "./turnCard/turnCard";
import { TopMenu } from "../../superAdmin/Reception/TopMenu/topMenu";
import { useTakeTest } from "../../../hooks/hookTakeTest";

export function TakeTest() {
    const [
        session, area, trace,
        filterLaboratorio, setFilterLab,
        filterImgen, setFilterImg, filterImg,
        keyPress, filterLab, selectTurn
    ] = useTakeTest();
    
    return (<RequireAuthSecret>
        <DivContainer>
            <TopMenu showOnlyTitle={true} sesion={session}/>
            {session.module ? <DivContent>
                    <DivBody>
                        {(area === null || area === 'Laboratorio') &&
                            <DivAreaContent>
                                <DivAreaTitle color={session.brand?.color}>
                                    Laboratorio
                                    <DivAreaTextSearch>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Búsqueda"
                                            value={filterLaboratorio}
                                            onKeyDown={(e) => keyPress(e, 'Laboratorio')}
                                            onChange={(e) => setFilterLab(e.target.value)}
                                        />
                                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={filterLab}>
                                            <FiSearch />
                                        </IconButton>
                                    </DivAreaTextSearch>
                                </DivAreaTitle>
                                <DivAreaBody>
                                    <DivAreaBodyGrid>
                                        {trace.filter(t => t.area.name === 'Laboratorio').map((element, index) => <TurnCard key={index} data={element} click={() => selectTurn(element)}/> )}
                                    </DivAreaBodyGrid>
                                </DivAreaBody>
                            </DivAreaContent>
                        }
                        {(area === null || area === 'Imagen') &&
                            <DivAreaContent>
                                <DivAreaTitle color={session.brand?.color}>
                                    Imagen y Citas
                                    <DivAreaTextSearch>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Búsqueda"
                                            value={filterImgen}
                                            onKeyDown={(e) => keyPress(e, 'Imagen')}
                                            onChange={(e) => setFilterImg(e.target.value)}
                                        />
                                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={filterImg}>
                                            <FiSearch />
                                        </IconButton>
                                    </DivAreaTextSearch>
                                </DivAreaTitle>
                                <DivAreaBody>
                                    <DivAreaBodyGrid>
                                        {/*Agregar filtro para citas*/ }
                                        {trace.filter(t => t.area.name === 'Imagen' || t.area.name === 'Citas').map((element, index) => <TurnCard key={index} data={element} click={() => selectTurn(element)}/> )}
                                    </DivAreaBodyGrid>
                                </DivAreaBody>
                            </DivAreaContent>
                        }
                    </DivBody>
            </DivContent> :
            <DivMessage>
                <MessageTitle>Módulo no disponible.</MessageTitle>
            </DivMessage>
            }
        </DivContainer>
    </RequireAuthSecret>);
}