import { useNavigate, useParams } from "react-router-dom";
import { useBrand } from "../../../../hooks/hookBrand";
import { useBranch } from "../../../../hooks/hookBranch";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { esES, DataGrid } from '@mui/x-data-grid';
import { ChromePicker  } from 'react-color';
import { Controller } from "react-hook-form";
import { DivContainer, DivTable, DivButtons, setTableStyles, BalloonButton, ButtonTable, IconAdd, IconEdit, IconDelete, DivModalBranch } from "./styles";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Confirm } from "../../utils/confirm";

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export function Branch() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const [brand, getBrands, brands] = useBrand();
    const navigate = useNavigate();
    const params = useParams();
    const user = useSelector((state) => state.currentUser.user);
    //------------------------------------------------------------------

    const [
        handlerOnSelectionModelChange, branchSelectedID,
        branchSelected,
        getBranches, branches,
        openFormBranch,
        handlerOpenFormBranch,
        handlerCloseFormBranch,
        isNew,
        color,
        handlerChangeColor,
        control,
        errors,
        handleSubmit,
        onSubmit,
        setIdBrand, idBrand,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        handleChangeBrand,
        getAreasBySucursal,
        openFormArea,
        handlerOpenFormAreas,
        handlerCloseFormAreas,
        handlerCheckAllAreas,
        handlerSaveAreas,
        printCheckBox
    ] = useBranch();

    const columns = [
        { field: 'name', headerName: 'Sucursal', flex: 1 },
        { field: 'urlTakeTurn', headerName: 'Toma turno', flex: 1,
            renderCell: (params) => (
               <ButtonTable color={brand && brand.color ? brand.color : BACKGROUDCOLOR }>
                   Abrir Toma Turno
               </ButtonTable> 
        ),},
        { field: 'urlScreen', headerName: 'Pantalla', flex: 1,
            renderCell: (params) => (<>
               <ButtonTable color={brand && brand.color ? brand.color : BACKGROUDCOLOR }>
                   Abrir Pantalla
               </ButtonTable>
            </>
        ),},
        { field: 'associate', headerName: 'Asociar', flex: 1,
            renderCell: (params) => (
                <ButtonTable onClick={() => {
                    handlerOpenFormAreas(params.value);
                    getAreasBySucursal(params.value);
                }} color={brand && brand.color ? brand.color : BACKGROUDCOLOR }>
                   Asociar Areas
               </ButtonTable> 
        ),}
    ];

    useEffect(() => {
        if (params.idBrand) {
            setIdBrand(params.idBrand);
        }
        else {
            getBrands();
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand !== '') {
            getBranches(idBrand);
        }
    }, [idBrand]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if ((user?.rol === 'Admin' || user?.rol === 'Sub-Admin') && !params.idBrand) {
            const brandStore = JSON.parse(localStorage.getItem('brand'));
            navigate(`/brands/${brandStore?._id}/panel/branches`, {replace: true});
        }
        else if (user?.rol === 'Super-Admin' && params.idBrand) {
            navigate(`/panel/branches`, {replace: true});
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        <DivContainer>
            <h1>Sucursales</h1>
            {!params.idBrand ? <>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Marcas</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idBrand}
                        label="Marca"
                        onChange={handleChangeBrand}
                    >
                        {brands.map((b, index) => <MenuItem key={index} value={b.id}>{b.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </> : <></>}
            <DivTable>
                <DataGrid sx={brand && brand.color ? setTableStyles(brand.color) : setTableStyles(BACKGROUDCOLOR)}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={branches}
                    pageSize={14}
                    rowsPerPageOptions={[14]}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={branchSelectedID}
                    onSelectionModelChange={(ids) => {
                        handlerOnSelectionModelChange(ids);
                    }}
                />
            </DivTable>
            <DivButtons>
                <Tooltip title="Nuevo">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormBranch(true)}}>
                        <IconAdd/>
                    </BalloonButton>
                </Tooltip>
                {branchSelected.length === 1 &&
                <Tooltip title="Editar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormBranch(false)}}>
                        <IconEdit/>
                    </BalloonButton>
                </Tooltip>
                }
                {branchSelected.length >= 1 &&
                <Tooltip title="Eliminar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handleShowConfirm(true)}}>
                        <IconDelete/>
                    </BalloonButton>
                </Tooltip>
                }
            </DivButtons>
        </DivContainer>

        <Dialog open={openFormBranch} onClose={handlerCloseFormBranch}>
            <DialogTitle>
                {isNew ? 'Nueva Sucursal': `Sucursal`}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <DivModalBranch>
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
                                    label="Sucursal"
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
                        <Controller
                            name="timeLimit"
                            control={control}
                            render={({ field }) => <TextField
                                    error={errors.color?.type === 'required'}
                                    helperText={errors?.color ? 'Campo obligatorio.' : ''}
                                    margin="dense"
                                    id="timeLimit"
                                    label="Tiempo limite de espera (min)"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    {...field}
                            />}
                            rules={{ required: true }}
                        />
                        <Controller
                            name="secretCode"
                            control={control}
                            render={({ field }) => <TextField
                                    error={errors.color?.type === 'required'}
                                    helperText={errors?.color ? 'Campo obligatorio.' : ''}
                                    margin="dense"
                                    id="secretCode"
                                    label="Codigo secreto"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...field}
                            />}
                            rules={{ required: true }}
                        />
                    </FormGroup>
                </DivModalBranch>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormBranch}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </DialogActions>
            </form>
        </Dialog>

        <Dialog open={openFormArea} onClose={handlerCloseFormAreas}>
            <DialogTitle>
                <Checkbox onChange={handlerCheckAllAreas}/>
                Areas en: {branchSelected?.name}
            </DialogTitle>
            <DialogContent>
                <FormGroup>
                    {printCheckBox()}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormAreas}>Cancelar</Button>
                <Button onClick={() => {handlerSaveAreas()}}>Guardar</Button>
            </DialogActions>
        </Dialog>

        <Confirm 
            open={openConfirm}
            title={'Eliminar Sucursales'} 
            message={'¿Desea realmente realizar la eliminación?'} 
            handleClose={() => {handleShowConfirm(false)}}
            handleAccept={handleAcceptConfirm}
        />
    </>);
}