import { DivContainer, DivHeader, DivBody, FormLogin, Button, Logo } from "./styles";
import { useLogin } from "../../../hooks/hookLogin";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { RequireNoAuth } from "../../../components/RequireNoAuth";

export function LoginSuperAdmin() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const logo = process.env.PUBLIC_URL + '/logo-aries.png';
    const [ login, brand ] = useLogin();
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: { username: '', password: '' }});
    const onSubmit = data => login(data);

    return (
        <RequireNoAuth>
            <DivContainer color={brand && brand.color ? brand.color : BACKGROUDCOLOR} className='background'>
                <>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                    <span color={brand && brand.color ? brand.color : BACKGROUDCOLOR}></span>
                </>
                <FormLogin onSubmit={handleSubmit(onSubmit)}>
                    <DivHeader>
                        <Logo crossorigin="anonymous" src={brand && brand.url ? brand.url : logo} alt="logo"></Logo>
                    </DivHeader>
                    <DivBody>
                        <h1 style={{color: brand ? '#000' : '#2a9aad'}}>Bienvenido</h1>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => <TextField 
                                                        error={errors.username?.type === 'required'}
                                                        helperText={errors.username ? 'Campo obligatorio.' : ''} 
                                                        id="username" label="Usuario" type="text" margin="dense" variant="standard" fullWidth autoFocus {...field}/> }
                            rules={{ required: true }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <TextField 
                                                        error={errors.password?.type === 'required'}
                                                        helperText={errors.password ? 'Campo obligatorio.' : ''} 
                                                        id="password" label="Contrase??a" type="password" margin="dense" variant="standard" fullWidth {...field}/> }
                            rules={{ required: true }}
                        />
                        
                        <Button color={brand && brand.color ? brand.color : '#a8ad00'} type="submit" value="Acceder" />
                    </DivBody>
                </FormLogin>
            </DivContainer>
        </RequireNoAuth>
    );
};
