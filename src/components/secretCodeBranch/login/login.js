import { DivContainer, DivHeader, DivBody, FormLogin, Button, Logo } from "./styles";
import { useLoginSecrete } from "../../../hooks/hookLoginSecret";
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { RequireNoAuthSecret } from "../../RequireNoAuthSecret";

export function LoginSecretCode() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const logo = process.env.PUBLIC_URL + '/logo-aries.png';
    const [ login, brand ] = useLoginSecrete();
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: { secretCode: '' }});
    const onSubmit = data => login(data);

    return (
        <RequireNoAuthSecret>
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
                            name="secretCode"
                            control={control}
                            render={({ field }) => <TextField 
                                                        error={errors.username?.type === 'required'}
                                                        helperText={errors.username ? 'Campo obligatorio.' : ''} 
                                                        id="secretCode" label="Codigo secreto" type="text" margin="dense" variant="standard" fullWidth autoFocus {...field}/> }
                            rules={{ required: true }}
                        />
                        
                        <Button color={brand && brand.color ? brand.color : '#a8ad00'} type="submit" value="Acceder" />
                    </DivBody>
                </FormLogin>
            </DivContainer>
        </RequireNoAuthSecret>
    );
};
