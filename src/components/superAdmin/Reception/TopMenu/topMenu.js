import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { BiLogOut, BiSelectMultiple } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { NavContainer, LogoContainer, Logo, TitleContainer, TitleMenu, OptionsContainer, OptionButton, ButtonText, ButtonSubMenu } from "./styles";

export function TopMenu(props) {
    const logo = process.env.PUBLIC_URL + '/logo-aries.png';
    const brand = JSON.parse(localStorage.getItem('brand'));

    return (<>
        <NavContainer color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
            <LogoContainer>
                <Logo src={brand && brand.url ? brand.url : logo} alt="logo"></Logo>
            </LogoContainer>
            <TitleContainer>
                {props.storeValues.module && <TitleMenu color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                    {props.storeValues.module.name}
                </TitleMenu>}
            </TitleContainer>
            <OptionsContainer>
                {!props.storeValues.branch && !props.storeValues.module &&
                <OptionButton onClick={props.handlerOnClickOpenBranch} color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                    <BiSelectMultiple className="icon" size={20}/>
                    <ButtonText>Seleccionar sucursal</ButtonText>
                </OptionButton>}
                {props.storeValues.branch && !props.storeValues.module &&
                <OptionButton onClick={props.handlerOnClickChangeBranch} color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                    <FaExchangeAlt className="icon" size={20}/>
                    <ButtonText>Cambiar sucursal</ButtonText>
                </OptionButton>}
                {!props.storeValues.module && props.storeValues.branch &&
                <OptionButton onClick={props.handlerOnClickOpenModule} color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                    <BiSelectMultiple className="icon" size={20}/>
                    <ButtonText>Seleccionar modulo</ButtonText>
                </OptionButton>}
                {props.storeValues.module && props.storeValues.branch &&
                <OptionButton onClick={props.handlerOnClickChangeModule} color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                    <FaExchangeAlt className="icon" size={20}/>
                    <ButtonText>Cambiar módulo</ButtonText>
                </OptionButton>}
                <OptionButton onClick={props.handlerLogout} color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                    <BiLogOut className="icon" size={20}/> 
                    <ButtonText>Cerrar sesión</ButtonText>
                </OptionButton>
            </OptionsContainer>
        </NavContainer>
        <Menu
            anchorEl={props.anchorEl}
            open={props.openSubMenu}
            onClose={props.handlerCloseSubMenu}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
                <div className="menu-modules-container">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="module-label">{props.isBranch ? 'Sucursal' : 'Módulo'}</InputLabel>
                        <Select
                            onChange={props.handlerChangeSelectValue}
                            value={props.valueSelect}
                            labelId="module-label"
                            id="module"
                        >
                            {props.valuesItemList.map((item, index)=> <MenuItem key={index} value={item._id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <ButtonSubMenu onClick={props.handlerSelectValue} color={props.storeValues.branch && props.storeValues.branch.color ? props.storeValues.branch.color : brand.color}>
                        Aceptar
                    </ButtonSubMenu>
                </div>
        </Menu>
    </>);
}