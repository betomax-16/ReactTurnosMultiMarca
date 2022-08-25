import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { DivContainer, DivTable, DivButtons, setTableStyles, BalloonButton, IconAdd, IconEdit, IconDelete } from "./styles";
import { esES, DataGrid } from '@mui/x-data-grid';
import { useModule } from "../../../../hooks/hookModule";
import { Controller  } from "react-hook-form";
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Confirm } from "../../utils/confirm";
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { ItemSupervisor } from "./itemSupervisor/itemSupervisor";
const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[600],
      '&:hover': {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600],
    },
}));

export function Module() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const params = useParams();
    const brand = JSON.parse(localStorage.getItem('brand'));

    const columns = [
        { field: 'name', headerName: 'Modulo', width: 120, mytype: 'string' }, 
        { field: 'type', headerName: 'Tipo', width: 100, mytype: 'string' },
        { field: 'status', headerName: 'Estado', width: 80, mytype: 'bool', renderCell: (params) => {
            const module = modules.find(m => m.id === params.value.id);
            return module && module.type === 'modulo' ? <GreenSwitch checked={params.value.val} onChange={(event) => handleChangeSwitchState(event, params.value)}/> : <></>
        }},
        { field: 'username', headerName: 'Atendiendo', width: 180, mytype: 'string' },
        { field: 'mode', headerName: 'Modalidad', width: 100, mytype: 'string' },
        { field: 'action', headerName: 'Acciones', flex: 1, renderCell: (params) => {
            const color = brand && brand.color ? brand.color : BACKGROUDCOLOR;
            return printButtonAssociate(params.value, color);
        } }
    ];

    const [
        getModules, modules,
        handlerOnSelectionModelChange, modulesSelectedID,
        openFormModule,
        handlerOpenFormModule,
        handlerCloseFormModule,
        isNew,
        modulesSelected,
        control,
        errors,
        handleSubmit,
        onSubmit,
        setIdBrand, idBrand,
        getBranches, branches, idBranchSelected,
        handleChangeBranch,
        typeModuleSelected, onChangeTypeModule,
        handleChangeSwitchState,
        openConfirm,
        handleAcceptConfirm,
        handleShowConfirm,
        printButtonAssociate,
        openFormPrivileges,
        closeFormPrivileges,
        savePrivileges,
        moduleSelectedButtonTable,
        areas,
        handleChangePrivileges,
        checkboxPrivilege,
        handerChangeCheckbox,
        
        openFormSupervisor,
        handleCloseFormSupervisor,
        supervisors,
        handlerChangeSupervisor,
        handlerDeleteSupervisor,
        addItemSupervisor,
        saveSupervisors
    ] = useModule();

    useEffect(() => {
        if (params.idBrand) {
            setIdBrand(params.idBrand);
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand) {
            getBranches();
        }
    }, [idBrand]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand && idBranchSelected) {
            getModules('');
        }
    }, [idBrand, idBranchSelected]);// eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        {!brand ? <Navigate to="/notFound" replace /> : <>
        <DivContainer>
            <h1>Modulos</h1>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idBranchSelected}
                    label="Sucursal"
                    onChange={handleChangeBranch}
                >
                    {branches.map((b, index) => <MenuItem key={index} value={b.id}>{b.name}</MenuItem>)}
                </Select>
            </FormControl>
            <DivTable>
                <DataGrid sx={brand && brand.color ? setTableStyles(brand.color) : setTableStyles(BACKGROUDCOLOR)}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={modules}
                    pageSize={14}
                    rowsPerPageOptions={[14]}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={modulesSelectedID}
                    onSelectionModelChange={(ids) => {
                        handlerOnSelectionModelChange(ids);
                    }}
                />
            </DivTable>
            <DivButtons>
                <Tooltip title="Nuevo">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormModule(true)}}>
                        <IconAdd/>
                    </BalloonButton>
                </Tooltip>
                {modulesSelected.length === 1 &&
                <Tooltip title="Editar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormModule(false)}}>
                        <IconEdit/>
                    </BalloonButton>
                </Tooltip>}
                {modulesSelected.length >= 1 &&
                <Tooltip title="Eliminar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handleShowConfirm(true)}}>
                        <IconDelete/>
                    </BalloonButton>
                </Tooltip>
                }
            </DivButtons>
        </DivContainer>

        <Dialog open={openFormModule} onClose={handlerCloseFormModule}>
            <DialogTitle>{isNew ? 'Nuevo ' : 'Editar '} modulo</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField
                                error={errors.name?.type === 'required'}
                                helperText={errors.name ? 'Campo obligatorio.' : ''}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                type="text"
                                fullWidth
                                variant="standard"
                                {...field}
                        />}
                        rules={{ required: true }}
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => <div className="select-input">
                        <InputLabel id="type-label" error={errors.type?.type === 'required'}>Tipo</InputLabel>
                        <FormControl error={errors.type?.type === 'required'} fullWidth>
                        <Select fullWidth
                                error={errors.type?.type === 'required'}
                                labelId="type-label"
                                id="type"
                                disabled={!isNew}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    onChangeTypeModule(e);
                                }}
                                label="Tipo" >
                            <MenuItem value=""><em>Vacío</em></MenuItem>
                            <MenuItem value="modulo"><em>Modulo</em></MenuItem>
                            <MenuItem value="vigia"><em>Vigia</em></MenuItem>
                            <MenuItem value="toma"><em>Toma</em></MenuItem>
                        </Select>
                        {errors.type && <FormHelperText>Campo obligatorio.</FormHelperText>}
                        </FormControl >
                        </div>}
                        rules={{ required: true }}
                    />
                    {typeModuleSelected.toLowerCase() === 'modulo' && <>
                    <Controller
                        name="mode"
                        control={control}
                        render={({ field }) => <div className="select-input">
                        <InputLabel id="mode-label" error={errors.mode?.type === 'required'}>Modalidad</InputLabel>
                        <FormControl error={errors.mode?.type === 'required'} fullWidth>
                        <Select fullWidth
                                error={errors.mode?.type === 'required'}
                                labelId="mode-label"
                                id="mode"
                                {... field}
                                label="Modalidad" >
                            <MenuItem value="auto"><em>Automático</em></MenuItem>
                            <MenuItem value="manual"><em>Manual</em></MenuItem>
                        </Select>
                        </FormControl >
                        </div>}
                        rules={{ required: true }}
                    />
                    </>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormModule}>Cancelar</Button>
                <Button type="submit" >Guardar</Button>
            </DialogActions>
            </form>
        </Dialog>

        <Dialog open={openFormPrivileges} onClose={closeFormPrivileges}>
            <DialogTitle>Prioridad: {moduleSelectedButtonTable?.name}</DialogTitle>
            <DialogContent>
                {areas.map(area => <TextField key={area.idArea} type="number" InputProps={{ inputProps: { min: 0, max: 10 } }} margin="dense" fullWidth variant="standard" label={area.name} value={area.privilege} onChange={(e) => {handleChangePrivileges(area.idArea, e.target.value)}}/>)}
                <Checkbox checked={checkboxPrivilege} onChange={handerChangeCheckbox}/>
                Por tiempo.
            </DialogContent>
            <DialogActions>
                <Button onClick={closeFormPrivileges}>Cancelar</Button>
                <Button onClick={() => {savePrivileges(idBrand, idBranchSelected, moduleSelectedButtonTable?.id)}}>Guardar</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openFormSupervisor} onClose={handleCloseFormSupervisor}>
            <DialogTitle style={{textAlign: 'center'}}>Supervisores</DialogTitle>
            <DialogContent>
                {supervisors.map((item, index) => <ItemSupervisor key={index} id={item.id} data={item} handleChange={handlerChangeSupervisor} handlerDelete={handlerDeleteSupervisor}/>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={addItemSupervisor}>Agregar</Button>
                <Button onClick={() => {saveSupervisors(idBrand, idBranchSelected, moduleSelectedButtonTable?.id)}}>Guardar</Button>
            </DialogActions>
        </Dialog>

        <Confirm 
            open={openConfirm}
            title={'Eliminar Modulos'} 
            message={'¿Desea realmente realizar la eliminación?'} 
            handleClose={() => {handleShowConfirm(false)}}
            handleAccept={handleAcceptConfirm}
        />
        </>}
    </>);
}