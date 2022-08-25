import { useState } from "react";
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { Confirm } from "../../../../utils/confirm";
import { MdOutlineClose } from "react-icons/md";
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { DivContainer, DivCardImage, DivCardSwitch, ButtonClose, Image } from "./styles";

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

export function CardAd(props) {
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleChange = (event, id) => {
        props.onUpdateAd(props.idBrand, id, event.target.checked);
    };

    const handleDelete = () => {
        setOpenConfirm(true);
    }

    const handleAcceptConfirm = async () => {
        props.onDeleteAd(props.idBrand, props.data._id);
        setOpenConfirm(false);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    return (<>
        <DivContainer>
            <Tooltip title="Eliminar">
                <ButtonClose onClick={handleDelete}><MdOutlineClose/></ButtonClose>
            </Tooltip>
            <DivCardImage>
                <Image src={props.data.url}></Image>
            </DivCardImage>
            <DivCardSwitch>
                <GreenSwitch
                    checked={props.data.isActive}
                    onChange={(e) => handleChange(e, props.data._id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </DivCardSwitch>
        </DivContainer>
        <Confirm 
                open={openConfirm}
                title={'Eliminar anuncio'} 
                message={'¿Desea realmente realizar la eliminación?'} 
                handleClose={handleCloseConfirm}
                handleAccept={handleAcceptConfirm}
                 />
    </>);
}