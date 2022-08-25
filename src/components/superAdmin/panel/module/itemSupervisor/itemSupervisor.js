import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdDelete } from "react-icons/md";
import { DivContainer, ButtonDelete } from "./styles";

export function ItemSupervisor(props) {
    return (<>
        <DivContainer>
            <Select fullWidth
                    value={props.data.selectOption}
                    onChange={(e) => props.handleChange(props.id, e)}
                    label="Vigia" >
                        {props.data.options.map((op, index) => <MenuItem  key={index} value={op._id}>{op.name}</MenuItem>)}
            </Select>
            <ButtonDelete>
                <MdDelete size={30} onClick={() => props.handlerDelete(props.id)}/>
            </ButtonDelete>
        </DivContainer>
    </>);
};