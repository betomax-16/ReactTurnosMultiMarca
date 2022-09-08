import moment from "moment";
import Tooltip from '@mui/material/Tooltip';
import { DivContainer, DivBody, DivFooter } from "./styles";

export function TurnCard(props) {
    const getMessageToolTip = () => {
        const message = props.data.user?.username ? `En atención con: ${props.data.user.username.toUpperCase()}` : 'Libre';
        return <span style={{fontSize: 15}}>{message}</span>;
    }

    return(<Tooltip title={getMessageToolTip()} >
        <div className="turnCard" onClick={props.click}>
            <DivContainer status={props.data.status}>
                <DivBody>
                    <span>{props.data.turn}</span>          
                </DivBody>
                <DivFooter>
                    <span className="hour">{moment(props.data.startDate).format('HH:mm')}</span>
                </DivFooter>
            </DivContainer>
        </div>
    </Tooltip>);
}