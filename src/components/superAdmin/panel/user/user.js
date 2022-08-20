import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBrand } from "../../../../hooks/hookBrand";
import { useUser } from "../../../../hooks/hookUser";
import { useSelector } from 'react-redux';
import { DivContainer, DivTable, DivButtons, setTableStyles, BalloonButton, BalloonButtonFilter, IconAdd, IconEdit, IconEditPass, IconDelete, IconFilter } from "./styles";
import { esES, DataGrid } from '@mui/x-data-grid';
import { Controller  } from "react-hook-form";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Confirm } from "../../utils/confirm";
import { FilterMenu } from "../../utils/filter/filter";
import { getOperatorMongo } from "../../../../utils/operatorsMongoQuery";

export function User() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const [brand] = useBrand();
    const navigate = useNavigate();
    const params = useParams();
    const user = useSelector((state) => state.currentUser.user);
    //---------------------------------------------------------------
    const columns = [
        { field: 'username', headerName: 'Username', flex: 1, mytype: 'string' },
        { field: 'name', headerName: 'Nombre', flex: 1, mytype: 'string' },
        { field: 'firstLastName', headerName: 'Apellido Paterno', flex: 1, mytype: 'string' },
        { field: 'secondLastName', headerName: 'Apellido Materno', flex: 1, mytype: 'string' },
        { field: 'rol', headerName: 'Rol', flex: 1, mytype: 'string' }
    ];

    const [
        getUsers, users,
        handlerOnSelectionModelChange, userSelectedID,
        userSelected,
        setIdBrand, idBrand,
        openFormUser,
        handlerOpenFormUser,
        handlerCloseFormUser,
        isNew,
        control,
        errors,
        handleSubmit,
        onSubmit,
        handleAcceptConfirm, openConfirm,
        handleShowConfirm,
        getRoles, roles,
        openFormChangePass,
        handlerOpenFormChangePass,
        handlerCloseFormChangePass,
        handlerSaveChangePass,
        setPass, pass,

        open_menu,
        anchorEl,
        handlerOpenMenu, handlerCloseMenu,
        filters,
        addFilter, removeFilter,
        handlerChangeSelectColumn,
        handlerChangeSelectOperator,
        handlerChangeValue,
        handlerChangeSelectLogicOperator
    ] = useUser(columns);

    

    useEffect(() => {
        if (params.idBrand) {
            setIdBrand(params.idBrand);
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand !== '' && user) {
            let query = '?';
            filters.forEach(filter => {
                const op = getOperatorMongo(filter.operator);
                const logicOp = filter.logicOperator !== undefined ? `|${filter.logicOperator}` : '';
                query += `${filter.field}=${filter.value}|${op}${logicOp}&`
            });
            query = query.substring(0, query.length - 1);

            getUsers(user, query);
        }
    }, [idBrand, user]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (idBrand !== '' && user) {
            let query = '?';
            filters.forEach(filter => {
                const op = getOperatorMongo(filter.operator);
                const logicOp = filter.logicOperator !== undefined ? `|${filter.logicOperator}` : '';
                query += `${filter.field}=${filter.value}|${op}${logicOp}&`
            });
            query = query.substring(0, query.length - 1);

            getUsers(user, query);
        }
    }, [filters]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if ((user?.rol === 'Admin' || user?.rol === 'Sub-Admin') && !params.idBrand) {
            const brandStore = JSON.parse(localStorage.getItem('brand'));
            navigate(`/brands/${brandStore?._id}/panel/users`, {replace: true});
        }
        else if (user?.rol === 'Super-Admin' && params.idBrand) {
            navigate(`/panel/users`, {replace: true});
        }
        else if (user?.rol === 'Super-Admin') {
            getUsers(user, '', true);
        }
        else {
            getRoles(user);
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    return (<>
        <DivContainer>
            <h1>Usuarios</h1>
            <DivTable>
                <DataGrid sx={brand && brand.color ? setTableStyles(brand.color) : setTableStyles(BACKGROUDCOLOR)}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    rows={users}
                    pageSize={14}
                    rowsPerPageOptions={[14]}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={userSelectedID}
                    onSelectionModelChange={(ids) => {
                        handlerOnSelectionModelChange(ids);
                    }}
                />
            </DivTable>
            {params.idBrand ? <>
                <Tooltip title="Filtros">
                    <BalloonButtonFilter color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={handlerOpenMenu}>
                        <IconFilter/>
                    </BalloonButtonFilter>
                </Tooltip>
            </> : <></>}
            <DivButtons>
                <Tooltip title="Nuevo">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormUser(true)}}>
                        <IconAdd/>
                    </BalloonButton>
                </Tooltip>
                {userSelected.length === 1 && user?.rol !== 'Super-Admin' &&
                <Tooltip title="Editar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormUser(false)}}>
                        <IconEdit/>
                    </BalloonButton>
                </Tooltip>}
                {userSelected.length === 1 &&
                <Tooltip title="Cambiar contraseña">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handlerOpenFormChangePass()}}>
                        <IconEditPass/>
                    </BalloonButton>
                </Tooltip>}
                {userSelected.length >= 1 &&
                <Tooltip title="Eliminar">
                    <BalloonButton color={brand && brand.color ? brand.color : BACKGROUDCOLOR} onClick={() => {handleShowConfirm(true)}}>
                        <IconDelete/>
                    </BalloonButton>
                </Tooltip>
                }
            </DivButtons>
        </DivContainer>

        <Dialog open={openFormUser} onClose={handlerCloseFormUser}>
            <DialogTitle>{isNew ? 'Nuevo ' : 'Editar '} usuario</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => <TextField
                                error={errors.username?.type === 'required'}
                                helperText={errors.username ? 'Campo obligatorio.' : ''}
                                inputProps={{ readOnly: !isNew }}
                                autoFocus
                                margin="dense"
                                id="username"
                                label="Username"
                                type="text"
                                fullWidth
                                variant="standard"
                                {...field}
                        />}
                        rules={{ required: true }}
                    />
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField 
                                                    error={errors.name?.type === 'required'}
                                                    helperText={errors.name ? 'Campo obligatorio.' : ''} 
                                                    inputProps={{ readOnly: !isNew }}
                                                    id="name" label="Nombre" type="text" margin="dense" variant="standard" fullWidth {...field}/> }
                        rules={{ required: true }}
                    />
                    <Controller
                        name="firstLastName"
                        control={control}
                        render={({ field }) => <TextField 
                                                    error={errors.firstLastName?.type === 'required'}
                                                    helperText={errors.firstLastName ? 'Campo obligatorio.' : ''} 
                                                    inputProps={{ readOnly: !isNew }}
                                                    id="firstLastName" label="Apellido Paterno" type="text" margin="dense" variant="standard" fullWidth {...field}/> }
                        rules={{ required: true }}
                    />
                    <Controller
                        name="secondLastName"
                        control={control}
                        render={({ field }) => <TextField 
                                                    error={errors.firstLastName?.type === 'required'}
                                                    helperText={errors.secondLastName ? 'Campo obligatorio.' : ''}
                                                    inputProps={{ readOnly: !isNew }}
                                                    id="secondLastName" label="Apellido Materno" type="text" margin="dense" variant="standard" fullWidth {...field}/> }
                        rules={{ required: true }}
                    />
                    {user?.rol !== 'Super-Admin' && <Controller
                        name="rol"
                        control={control}
                        render={({ field }) => <div className="select-input">
                        <InputLabel id="rol-label" error={errors.sucursal?.type === 'required'}>Rol</InputLabel>
                        <FormControl error={errors.rol?.type === 'required'} fullWidth>
                        <Select fullWidth
                                error={errors.rol?.type === 'required'}
                                labelId="rol-label"
                                id="rol"
                                {... field}
                                label="Rol"  >
                            <MenuItem key={-1} value=""><em>Vacío</em></MenuItem>
                            {roles.map((rol, index) =>
                                <MenuItem key={index} value={rol.name}>{rol.name}</MenuItem>
                            )}
                        </Select>
                        {errors.rol && <FormHelperText>Campo obligatorio.</FormHelperText>}
                        </FormControl >
                        </div>}
                        rules={{ required: true }}
                    />}
                    {isNew && <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <TextField 
                                                    error={errors.password?.type === 'required'}
                                                    helperText={errors.password ? 'Campo obligatorio.' : ''}
                                                    id="password" label="Contraseña" type="password" margin="dense" variant="standard" fullWidth {...field}/> }
                        rules={{ required: true }}
                    />}
                    
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormUser}>Cancelar</Button>
                <Button type="submit" >Guardar</Button>
            </DialogActions>
            </form>
        </Dialog>

        <Dialog open={openFormChangePass} onClose={handlerCloseFormChangePass}>
            <DialogTitle>Cambiar contraseña para: {userSelected.length ? userSelected[0].username : ''}</DialogTitle>
            <DialogContent>
                <TextField 
                    value={pass.value}
                    onChange={(e) => setPass({ value: e.target.value, error: false })}
                    error={errors.password?.type === 'required'}
                    helperText={errors.password ? 'Campo obligatorio.' : ''}
                    label="Contraseña" type="password" margin="dense" variant="standard" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={handlerCloseFormChangePass}>Cancelar</Button>
                <Button onClick={handlerSaveChangePass}>Guardar</Button>
            </DialogActions>
        </Dialog>

        <Confirm 
            open={openConfirm}
            title={'Eliminar Usuarios'} 
            message={'¿Desea realmente realizar la eliminación?'} 
            handleClose={() => {handleShowConfirm(false)}}
            handleAccept={handleAcceptConfirm}
        />

        <FilterMenu 
            open={open_menu} 
            anchorEl={anchorEl} 
            handleClose={handlerCloseMenu} 
            
            columns={columns} 
            filters={filters}
            add={addFilter}
            remove={removeFilter}
            handlerSelectColumn={handlerChangeSelectColumn}
            handlerSelectOperator={handlerChangeSelectOperator}
            handlerValue={handlerChangeValue}
            handlerSelectLogicOperator={handlerChangeSelectLogicOperator}/>
    </>);
}