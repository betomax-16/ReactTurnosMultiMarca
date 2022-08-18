import { useEffect } from "react";
import { useArea } from "../../../../hooks/hookArea";
import { Navigate } from "react-router-dom";
import { esES, DataGrid } from '@mui/x-data-grid';
import { useParams } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Controller } from "react-hook-form";
import { DivContainer, DivTable, DivButtons, setTableStyles, BalloonButton, IconAdd, IconEdit, IconDelete, DivModal } from "./styles";
import { Confirm } from "../../utils/confirm";

export function Area() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const brand = JSON.parse(localStorage.getItem('brand'));
    const params = useParams();
    //--------------------------------------------------------
    const [
        getAreas, areas,
        handlerOnSelectionModelChange, areaSelectedID,
        areaSelected,
        openFormArea,
        handlerOpenFormArea,
        handlerCloseFormArea,
        isNew,
        control,
        errors,
        handleSubmit,
        onSubmit,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        setIdBrand, idBrand
    ] = useArea();

    const columns = [
        { field: 'name', headerName: 'Nombre', flex: 1 },
        { field: 'prefix', headerName: 'Prefijo', flex: 1 }
    ];

    useEffect(() => {
        if (params.idBrand) {
            setIdBrand(params.idBrand);
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand !== '') {
            getAreas();
        }
    }, [idBrand]);// eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        {!brand ? <Navigate to="/notFound" replace /> : <>
        <DivContainer>
            <h1>Areas</h1>
            <DivTable>
                <DataGrid sx={brand && brand.color ? setTableStyles(brand.color) : setTableStyles(BACKGROUDCOLOR)}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={areas}
                    pageSize={14}
                    rowsPerPageOptions={[14]}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={areaSelectedID}
                    onSelectionModelChange={(ids) => {
                        handlerOnSelectionModelChange(ids);
                    }}
                />
            </DivTable>
            <DivButtons>
                <Tooltip title="Nuevo">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormArea(true)}}>
                        <IconAdd/>
                    </BalloonButton>
                </Tooltip>
                {areaSelected.length === 1 &&
                <Tooltip title="Editar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormArea(false)}}>
                        <IconEdit/>
                    </BalloonButton>
                </Tooltip>
                }
                {areaSelected.length >= 1 &&
                <Tooltip title="Eliminar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handleShowConfirm(true)}}>
                        <IconDelete/>
                    </BalloonButton>
                </Tooltip>
                }
            </DivButtons>
        </DivContainer>

        <Dialog open={openFormArea} onClose={handlerCloseFormArea}>
            <DialogTitle>
                {isNew ? 'Nueva Area': `Area`}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <DivModal>
                    <FormGroup>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField
                                    error={errors.name?.type === 'required'}
                                    helperText={errors?.name ? 'Campo obligatorio.' : ''}
                                    margin="dense"
                                    id="name"
                                    label="Marca"
                                    type="text"
                                    fullWidth
                                    autoFocus
                                    variant="standard"
                                    {...field}
                            />}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="prefix"
                            control={control}
                            render={({ field }) => <TextField
                                    error={errors.color?.type === 'required'}
                                    helperText={errors?.color ? 'Campo obligatorio.' : ''}
                                    margin="dense"
                                    id="prefix"
                                    label="Prefijo"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...field}
                            />}
                            rules={{ required: true }}
                        />
                    </FormGroup>
                </DivModal>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormArea}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </DialogActions>
            </form>
        </Dialog>

        <Confirm 
            open={openConfirm}
            title={'Eliminar Areas'} 
            message={'¿Desea realmente realizar la eliminación?'} 
            handleClose={() => {handleShowConfirm(false)}}
            handleAccept={handleAcceptConfirm}
        />
        </>}
    </>);
}