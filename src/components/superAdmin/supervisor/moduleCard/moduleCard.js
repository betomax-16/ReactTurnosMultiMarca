import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { DivContainer, DivCardBody, DivCardFooter, 
         DivCardFooterTitle, DivCardFooterImportant, DivCardFooterTag,
         DivContainerColor } from "./styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} followCursor/>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export function ModuleCard(props) {

  const getFullNameUser = () => {
    let fullName = props.data.username;
    if (props.data && props.data.user && props.data.user.name) {
      fullName = `${props.data.user.name} ${props.data.user.firstLastName} ${props.data.user.secondLastName}`;
    }

    return fullName;
  }

  const getPrivilages = () => {
    const items = [];
    if (props.data.modulo.mode === 'auto') {
      let message = 'No';
      if (props.data.modulo.hasPrivilegedArrivalTime) {
        message = 'Si';
      }

      items.push(<li key={0}>Por tiempo de espera - ({message})</li>);
      if (props.data.privileges.length) {
        const auxPrivileges = props.data.privileges.sort(( a, b ) => {
          if ( a.privilege < b.privilege ){
            return -1;
          }
          if ( a.privilege > b.privilege ){
            return 1;
          }
          return 0;
        });
        auxPrivileges.forEach((element, index) => {
          items.push(<li key={index + 1}>{element.area.name} - {element.privilege}</li>);
        });
      }
      else {
        items.push(<li key={1}>Sin Privilegios.</li>);
      }  
    }
    
    return items;
  }

  const getNumber = () => {
    const words = props.data.modulo.name.split(' ');
    let num = '#';
    if (words.length > 1) {
      num = words[1].trim();
    }

    return num;
  }

  const getStatus = () => {
    let status = '';
    if (props.data.user) {
      status = props.data.modulo.status ? 'Activo' : 'Inactivo';
    }
    else {
      status = 'Libre';
    }

    return status;
  }

  return (<>
    <HtmlTooltip
      title={<>
          <h2>Datos y configuración</h2>
          <h3>Usuario:</h3><em>{getFullNameUser()}</em>
          <h3>Modo:</h3><em>{props.data.modulo.mode.toUpperCase()}</em>
          {props.data.modulo.mode === 'auto' && <><h3>Privilegios:</h3><ul>{getPrivilages()}</ul></>}
      </>}
    >
      <DivContainer data-tip="Hola" data-for="global" onClick={props.clic}>
        <DivContainerColor status={props.data}>
          <DivCardBody>
            <span>{getNumber()}</span>          
          </DivCardBody>
          <DivCardFooter>
            <DivCardFooterTitle color={props.color}>Módulo</DivCardFooterTitle>
            {props.data.user?.username !== undefined && props.data.user?.username !== '' &&
            <DivCardFooterTag>Usuario: <DivCardFooterImportant color={props.color}>{props.data.user?.username}</DivCardFooterImportant></DivCardFooterTag>}
            <DivCardFooterTag>Estado: <DivCardFooterImportant color={props.color}>{getStatus()}</DivCardFooterImportant></DivCardFooterTag>
          </DivCardFooter>
        </DivContainerColor>
      </DivContainer>
    </HtmlTooltip>
  </>);
}