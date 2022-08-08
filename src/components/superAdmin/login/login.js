import { DivContainer, DivHeader, DivBody, FormLogin, Button, Logo } from "./styles";
import { useLogin } from "../../../hooks/hookLogin";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import logo from '../../../assets/img/logo-aries.png';
import { RequireNoAuth } from "../../../components/RequireNoAuth";

export function LoginSuperAdmin() {
    const [ login ] = useLogin();
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: { username: '', password: '' }});
    const onSubmit = data => login(data);

    return (
        <RequireNoAuth>
            <DivContainer>
                <FormLogin onSubmit={handleSubmit(onSubmit)}>
                    <DivHeader>
                        <Logo src={logo} alt="logo"></Logo>
                    </DivHeader>
                    <DivBody>
                        <h1 style={{color: '#2a9aad'}}>Bienvenido</h1>
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
                                                        id="password" label="Contraseña" type="password" margin="dense" variant="standard" fullWidth {...field}/> }
                            rules={{ required: true }}
                        />
                        
                        <Button type="submit" value="Acceder" />
                    </DivBody>
                </FormLogin>
            </DivContainer>
        </RequireNoAuth>
    );
};
