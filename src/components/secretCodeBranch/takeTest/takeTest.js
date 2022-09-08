import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { DivContainer, DivContent, DivBody, 
         DivAreaContent, DivAreaTitle, DivAreaTextSearch,
         DivAreaBody, DivAreaBodyGrid, DivMessage, MessageTitle } from "./styles";
import { RequireAuthSecret } from "../../RequireAuthSecret";
import { TurnCard } from "./turnCard/turnCard";
import { TopMenu } from "../../superAdmin/Reception/TopMenu/topMenu";
import { useTakeTest } from "../../../hooks/hookTakeTest";
import { styled } from '@mui/material/styles';
import { blue, green, red, orange, purple } from '@mui/material/colors';

const ButtonGreen = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
}));
const ButtonGreen2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[300]),
    backgroundColor: green[300],
    '&:hover': {
      backgroundColor: green[400],
    },
}));
const ButtonBlue = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
}));
const ButtonRed = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
}));
const ButtonOrange = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
}));

export function TakeTest() {
    const [
        session, area, trace,
        filterLaboratorio, setFilterLab,
        filterImgen, setFilterImg, filterImg,
        keyPress, filterLab, selectTurn,
        openDialog, selectedTurn, idExakta,
        submit, handleCloseDialog, handlerChangeIdExakta
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

        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>
                <div className="title-content">
                    <span>Turno seleccionado: {selectedTurn ? selectedTurn.turn ? selectedTurn.turn.turn : '' : ''}</span>
                    <AiOutlineClose className="button-close" onClick={handleCloseDialog}/>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextField
                    error={idExakta.error}
                    helperText={idExakta.error ? 'Campo obligatorio.' : ''}                            
                    autoFocus
                    margin="dense"
                    label="IdExakta"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={idExakta.value}
                    onChange={handlerChangeIdExakta}
                />
            </DialogContent>
            <DialogActions>
                {selectedTurn && selectedTurn.action === 'otra accion' && <>
                    <ButtonBlue onClick={() => submit("Rellamar")}>Rellamar</ButtonBlue>
                    <ButtonGreen2 onClick={() => submit("Terminar")}>Terminar</ButtonGreen2>
                    <ButtonRed onClick={() => submit("Cancelar")}>Cancelar</ButtonRed>
                    <ButtonOrange onClick={() => submit("Liberar")}>Liberar</ButtonOrange>
                </>}
                {selectedTurn && selectedTurn.action === 'atender' && <>
                    <ButtonGreen onClick={() => submit("Atender")}>Atender</ButtonGreen>
                </>}
            </DialogActions>
        </Dialog>
    </RequireAuthSecret>);
}