import Menu from '@mui/material/Menu';
import { ItemFilter } from "./item/itemFilter";
import { DivHeader, ButtonPlus, HeaderTitle, DivFilters } from "./styles";

export function FilterMenu(props) {
    return (
      <Menu
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <DivHeader>
            <ButtonPlus onClick={props.add} size={25}/>
            <HeaderTitle>Operación</HeaderTitle>
            <HeaderTitle>Campo</HeaderTitle>
            <HeaderTitle>Comparación</HeaderTitle>
            <HeaderTitle>Valor</HeaderTitle>
        </DivHeader>
        <DivFilters>
            {props.filters.map((filter, index) => <ItemFilter 
                                            key={index}
                                            logicOperator={filter.logicOperator}
                                            columns={props.columns} 
                                            type={filter.type}
                                            field={filter.field} 
                                            operator={filter.operator} 
                                            value={filter.value} 
                                            index={filter.index}
                                            remove={props.remove}
                                            handlerSelectLogicOperator={props.handlerSelectLogicOperator}
                                            handlerSelectColumn={props.handlerSelectColumn}
                                            handlerSelectOperator={props.handlerSelectOperator}
                                            handlerValue={props.handlerValue}/>)}
        </DivFilters>
      </Menu>
    );
}