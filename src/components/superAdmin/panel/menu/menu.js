import Tooltip from '@mui/material/Tooltip';
import { RiBuilding2Fill } from "react-icons/ri";
import { FaBuysellads, FaUsers } from "react-icons/fa";
import { IoTicket, IoStorefront } from "react-icons/io5";
import { BiLogOut, BiCurrentLocation, BiReset } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import { MdSchema, MdLocalConvenienceStore } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { useMenu } from "../../../../hooks/hookMenu";
import { useBrand } from "../../../../hooks/hookBrand";
import { Nav, ImgLogo, DivLogo, DivOptions, DivOption, LinkStyle, Icon, Title, SubMenu, DivSubOption } from "./styles";

export function Menu() {
    const BACKGROUDCOLOR = '#0e8b9e';
    const logo = process.env.PUBLIC_URL + '/logo-aries.png';
    const [user, toggleTurn, setToggleTurn, logout, handlerOpenModalSucursal] = useMenu();
    const [brand] = useBrand();

    return (
        <Nav color={brand && brand.color ? brand.color : BACKGROUDCOLOR}>
            <DivLogo>
                <ImgLogo src={brand && brand.logo ? brand.logo : logo} alt="logo"></ImgLogo>
            </DivLogo>
            <DivOptions>
                {user && (user.rol === 'Super-Admin') && <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to="/panel/brands">
                    <DivOption>
                        <Tooltip title="Marcas">
                            <Icon>
                                <RiBuilding2Fill size={30}/>
                            </Icon>    
                        </Tooltip>
                        <Title>Marcas</Title>
                    </DivOption>
                </LinkStyle>}
                <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={brand ? `/brands/${brand._id}/panel/branches` : '/panel/branches'}>
                    <DivOption>
                        <Tooltip title="Sucursales">
                            <Icon>
                                <IoStorefront size={30}/>
                            </Icon>    
                        </Tooltip>
                        <Title>Sucursales</Title>
                    </DivOption>
                </LinkStyle>
                <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={brand ? `/brands/${brand._id}/panel/users` : '/panel/users'}>
                    <DivOption>
                        <Tooltip title="Usuarios">
                            <Icon>
                                <FaUsers size={30}/>
                            </Icon>    
                        </Tooltip>
                        <Title>Usuarios</Title>
                    </DivOption>
                </LinkStyle>
                {user && (user.rol === 'Admin' || user.rol === 'Sub-Admin') && <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={`/brands/${brand?._id}/panel/modules`}>
                    <DivOption>
                        <Tooltip title="Modulos">
                            <Icon>
                                <MdLocalConvenienceStore size={30}/>
                            </Icon> 
                        </Tooltip>
                        <Title>Modulos</Title>
                    </DivOption>
                </LinkStyle>}
                {user && (user.rol === 'Admin' || user.rol === 'Sub-Admin') && <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={`/brands/${brand?._id}/panel/areas`}>
                    <DivOption>
                        <Tooltip title="Areas">
                            <Icon>
                                <MdSchema size={30}/>
                            </Icon> 
                        </Tooltip>
                        <Title>Areas</Title>
                    </DivOption>
                </LinkStyle>}
                <div>
                    <DivOption onClick={() => {setToggleTurn(!toggleTurn)}}>
                        <Tooltip title="Turnos">
                            <Icon>
                                <IoTicket size={30}/>
                            </Icon> 
                        </Tooltip>
                        <Title>Turnos</Title>
                    </DivOption>
                    <SubMenu show={toggleTurn}>
                        {user && (user.rol === 'Admin' || user.rol === 'Sub-Admin') && <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={`/brands/${brand?._id}/panel/turns/current`}>
                            <DivSubOption>
                                <Tooltip title="Turnos actuales">
                                    <Icon>
                                        <BiCurrentLocation size={30}/>
                                    </Icon> 
                                </Tooltip>
                                <Title>Actuales</Title>
                            </DivSubOption>
                        </LinkStyle>}
                        {user && (user.rol === 'Admin' || user.rol === 'Sub-Admin') && <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={`/brands/${brand?._id}/panel/turns/history`}>
                            <DivSubOption>
                                <Tooltip title="Turnos Historicos">
                                    <Icon>
                                        <BsClockHistory size={30}/>
                                    </Icon> 
                                </Tooltip>
                                <Title>Historicos</Title>
                            </DivSubOption>
                        </LinkStyle>}
                        <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={brand ? `/brands/${brand._id}/panel/turns/report` : '/panel/turns/report'}>
                            <DivSubOption>
                                <Tooltip title="Reportes">
                                    <Icon>
                                        <HiDocumentReport size={30}/>
                                    </Icon> 
                                </Tooltip>
                                <Title>Reportes</Title>
                            </DivSubOption>
                        </LinkStyle>
                        {user && (user.rol === 'Admin' || user.rol === 'Sub-Admin') && <DivSubOption onClick={handlerOpenModalSucursal}>
                            <Tooltip title="Re-iniciar turnos">
                                <Icon>
                                    <BiReset size={30}/>
                                </Icon> 
                            </Tooltip>
                            <Title>Re-iniciar</Title>
                        </DivSubOption>}
                    </SubMenu>
                </div>
                {user && (user.rol === 'Admin' || user.rol === 'Sub-Admin') && <LinkStyle color={brand && brand.color ? brand.color : BACKGROUDCOLOR} to={`/brands/${brand?._id}/panel/ads`}>
                    <DivOption>
                        <Tooltip title="Anuncios">
                            <Icon>
                                <FaBuysellads size={30}/>
                            </Icon> 
                        </Tooltip>
                        <Title>Anuncios</Title>
                    </DivOption>
                </LinkStyle>}
                <DivOption onClick={logout}>
                    <Tooltip title="Cerrar Sesión">
                        <Icon>
                            <BiLogOut size={30}/>
                        </Icon> 
                    </Tooltip>
                    <Title>Cerrar sesión</Title>
                </DivOption>
            </DivOptions>
        </Nav>
    );
}