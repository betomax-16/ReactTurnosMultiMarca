import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useBrand } from "../../../../hooks/hookBrand";
import { DivContainer, DivTable, ImgLogo, DivColor, DivButtons, DivModalBrand, setTableStyles, BalloonButton, ButtonTable, IconAdd, IconEdit, IconDelete } from "./styles";
import { esES, DataGrid } from '@mui/x-data-grid';
import { Controller  } from "react-hook-form";
import { ChromePicker  } from 'react-color';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { useController  } from "react-hook-form";
import { Confirm } from "../../utils/confirm";

export function Brand() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const [
        brand, 
        getBrands, brands,
        handlerOnSelectionModelChange, brandSelectedID,
        brandSelected,
        openFormBrand,
        handlerOpenFormBrand,
        handlerCloseFormBrand,
        isNew,
        color,
        handlerChangeColor,
        control,
        errors,
        handleSubmit,
        onSubmit,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        copyUrlLogin
    ] = useBrand();

    const columns = [
        { field: 'name', headerName: 'Nombre' },
        { field: 'url', headerName: 'Logo', flex: 1, renderCell: (params) => (
            <ImgLogo alt="logo" src={params.value}/>
        ) },
        { field: 'color', headerName: 'Color', flex: 1, renderCell: (params) => (
            <DivColor color={params.value}/>
        ) },
        { field: 'pathLogin', headerName: 'Login', flex: 1, renderCell: (params) => (
            <ButtonTable color={BACKGROUDCOLOR} onClick={() => {copyUrlLogin(params.value)}}>Copiar</ButtonTable>
        ) }
    ];

    

    useEffect(() => {
        getBrands();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        {brand ? <Navigate to="/notFound" replace /> : <> 
        <DivContainer>
            <h1>Marcas</h1>
            <DivTable>
                <DataGrid sx={setTableStyles(BACKGROUDCOLOR)}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={brands}
                    pageSize={14}
                    rowsPerPageOptions={[14]}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={brandSelectedID}
                    onSelectionModelChange={(ids) => {
                        handlerOnSelectionModelChange(ids);
                    }}
                />
            </DivTable>
            <DivButtons>
                <Tooltip title="Nuevo">
                    <BalloonButton color={BACKGROUDCOLOR} onClick={() => {handlerOpenFormBrand(true)}}>
                        <IconAdd/>
                    </BalloonButton>
                </Tooltip>
                {brandSelected.length === 1 &&
                <Tooltip title="Editar">
                    <BalloonButton color={BACKGROUDCOLOR} onClick={() => {handlerOpenFormBrand(false)}}>
                        <IconEdit/>
                    </BalloonButton>
                </Tooltip>
                }
                {brandSelected.length >= 1 &&
                <Tooltip title="Eliminar">
                    <BalloonButton color={BACKGROUDCOLOR} onClick={() => {handleShowConfirm(true)}}>
                        <IconDelete/>
                    </BalloonButton>
                </Tooltip>
                }
            </DivButtons>
        </DivContainer>

        <Dialog open={openFormBrand} onClose={handlerCloseFormBrand}>
            <DialogTitle>
                {isNew ? 'Nueva Marca': `Marca`}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <DivModalBrand>
                    <ChromePicker color={color} onChange={handlerChangeColor}/>
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
                            name="color"
                            control={control}
                            render={({ field }) => <TextField
                                    disabled
                                    error={errors.color?.type === 'required'}
                                    helperText={errors?.color ? 'Campo obligatorio.' : ''}
                                    margin="dense"
                                    id="color"
                                    label="Color"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...field}
                            />}
                            rules={{ required: true }}
                        />
                        <FileInput name="myFiles" control={control} />
                        {errors?.myFiles && <span>Campo obligatorio.</span>}
                    </FormGroup>
                </DivModalBrand>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormBrand}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </DialogActions>
            </form>
        </Dialog>

        <Confirm 
            open={openConfirm}
            title={'Eliminar Marcas'} 
            message={'¿Desea realmente realizar la eliminación?'} 
            handleClose={() => {handleShowConfirm(false)}}
            handleAccept={handleAcceptConfirm}
        />
        </>}
    </>);
}

const FileInput = ({ control, name }) => {
    const { field } = useController({ control, name });
    const [value, setValue] = useState("");
    return (
        <input
            type="file"
            accept=".jpg, .jpeg, .png"
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                field.onChange(e.target.files);
            }}
        />
    );
};