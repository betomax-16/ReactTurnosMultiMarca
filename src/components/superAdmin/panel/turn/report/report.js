import { useNavigate, useParams } from "react-router-dom";
import { useBrand } from "../../../../../hooks/hookBrand";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { DivContainer, Form, ButtonStyle, Table, setTableStyles } from "./styles";
import { DataGrid, GridToolbarContainer, GridToolbarExport, esES } from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm, Controller  } from "react-hook-form";
import moment from "moment";
import { useReports } from "../../../../../hooks/hookReports";
import { BsSearch } from "react-icons/bs";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{ utf8WithBom: true } }/>
        </GridToolbarContainer>
    );
}

export function Report() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const brand = JSON.parse(localStorage.getItem('brand'));
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
        startDate: moment().set("date",1),
        finalDate: moment().set("date",1).add(1, 'month'),
        sucursal: '',
        area: ''
    }});

    const [
        data,
        showLoading,
        columns,
        selectOptionReport,
        handleChange,
        onSubmit,
        handleChangeBranch,
        branches,
        areas
    ] = useReports();

    useBrand();
    const navigate = useNavigate();
    const params = useParams();
    const user = useSelector((state) => state.currentUser.user);

    useEffect(() => {
        if ((user?.rol === 'Admin' || user?.rol === 'Sub-Admin') && !params.idBrand) {
            const brandStore = JSON.parse(localStorage.getItem('brand'));
            navigate(`/brands/${brandStore?._id}/panel/turns/report`, {replace: true});
        }
        else if (user?.rol === 'Super-Admin' && params.idBrand) {
            navigate(`/panel/turns/report`, {replace: true});
        }
    }, [user]);// eslint-disable-line react-hooks/exhaustive-deps

    
    return (<>
        <DivContainer>
            <h1>Reportes</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="select-input">
                    <FormControl style={{width:200}}>
                    <InputLabel id="rol-label" shrink htmlFor="select-multiple-native">Tipo</InputLabel>
                        <Select fullWidth
                                labelId="type-label"
                                value={selectOptionReport}
                                onChange={handleChange}
                                id="type"
                                label="Tipo"  >
                            <MenuItem key={0} value="General"><em>General</em></MenuItem>
                            <MenuItem key={1} value="GeneralByHour"><em>Por cada 30 min.</em></MenuItem>
                            <MenuItem key={2} value="Detail"><em>Detallado</em></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => <div className="select-input">
                    <FormControl error={errors.startDate?.type === 'required'} fullWidth>
                        <DesktopDatePicker
                            error={errors.startDate?.type === 'required'}
                            label="Desde"
                            inputFormat="DD/MM/YYYY"
                            renderInput={(params) => <TextField {...params} />}
                            {...field}
                        />
                    {errors.startDate && <FormHelperText>Campo obligatorio.</FormHelperText>}
                    </FormControl >
                    </div>}
                    rules={{ required: true }}
                />
                <Controller
                    name="finalDate"
                    control={control}
                    render={({ field }) => <div className="select-input">
                    <FormControl error={errors.finalDate?.type === 'required'} fullWidth>
                        <DesktopDatePicker
                            error={errors.finalDate?.type === 'required'}
                            label="Hasta"
                            inputFormat="DD/MM/YYYY"
                            renderInput={(params) => <TextField {...params} />}
                            {...field}
                        />
                    {errors.finalDate && <FormHelperText>Campo obligatorio.</FormHelperText>}
                    </FormControl >
                    </div>}
                    rules={{ required: true }}
                />
                <Controller
                    name="sucursal"
                    control={control}
                    render={({ field }) => {
                        return <FormControl style={{width:200}}>
                            <InputLabel id="rol-label" shrink htmlFor="select-multiple-native">Sucursal</InputLabel>
                            <Select fullWidth
                                    labelId="type-label"
                                    id="sucursal"
                                    label="Sucursal"
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleChangeBranch(e);
                                    }}
                                    >
                                {branches.map((b, index) => <MenuItem key={index} value={b.id}>{b.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    }}
                />
                <Controller
                    name="area"
                    control={control}
                    render={({ field }) => {
                        return <FormControl style={{width:200}}>
                            <InputLabel id="rol-label" shrink htmlFor="select-multiple-native">Area</InputLabel>
                            <Select fullWidth
                                    labelId="type-label"
                                    id="area"
                                    label="Area"
                                    {...field}
                                    >
                                {areas.map((a, index) => <MenuItem key={index} value={a.id}>{a.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    }}
                />
                <ButtonStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} type="submit" variant="contained" >
                    <BsSearch size={20}/>
                </ButtonStyle>
            </Form>
            <Table>
                {!showLoading ? 
                    <DataGrid sx={setTableStyles(brand && brand.color ? brand.color : BACKGROUDCOLOR)}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        rows={data}
                        columns={columns}
                        pageSize={30}
                        rowsPerPageOptions={[30]}
                        disableSelectionOnClick
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    /> :
                    <CircularProgress size={100}/>
                }
            </Table>
        </DivContainer>
    </>);
}