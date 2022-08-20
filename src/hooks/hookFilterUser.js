import { useState } from "react";

export const useFilterUser = (columns) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open_menu = Boolean(anchorEl);
    const handlerOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handlerCloseMenu = () => {
        setAnchorEl(null);
    };

    const [indexFilter, setIndexFilter] = useState(0);
    const [filters, setFilters] = useState([
        {
            index: indexFilter,
            field: columns[0].field,
            operator: '%',
            value: ''
        }
    ]);

    // useEffect(() => {
    //     let query = '?';
    //     filters.forEach(filter => {
    //         const op = getOperatorMongo(filter.operator);
    //         const logicOp = filter.logicOperator !== undefined ? `|${filter.logicOperator}` : '';
    //         query += `${filter.field}=${filter.value}|${op}${logicOp}&`
    //     });
    //     query = query.substring(0, query.length - 1);

    //     let auxUrlUsers = urlUsers;
    //     auxUrlUsers += query;
    //     getUsers(auxUrlUsers);

    // }, [filters]);// eslint-disable-line react-hooks/exhaustive-deps

    const addFilter = () => {
        let auxIndex = indexFilter;
        auxIndex++;
        const auxData = [ ...filters ];

        const filter = {
            index: auxIndex,
            logicOperator: 'and',
            field: columns[0].field,
            operator: '=',
            value: ''
        };

        if (auxData.length === 0) {
            delete filter.logicOperator;
        }

        auxData.push(filter);

        setFilters(auxData);
        setIndexFilter(auxIndex);
    }

    const removeFilter = (index) => {
        const auxData = [ ...filters ];
        const removeIndex = auxData.map(item => item.index).indexOf(index);
        if (removeIndex !== -1) {
            if (removeIndex === 0) {
                if (auxData.length > 1) {
                    delete auxData[1].logicOperator;
                }
                auxData.splice(removeIndex, 1);
            }
            else {
                auxData.splice(removeIndex, 1);
            }
        }

        setFilters(auxData);
    }

    const handlerChangeSelectColumn = (event, index) => {
        const auxData = [ ...filters ];
        const editIndex = auxData.map(item => item.index).indexOf(index);
        if (editIndex !== -1) {
            auxData[editIndex].field = event.target.value;
        }

        setFilters(auxData);
    };

    const handlerChangeSelectOperator = (event, index) => {
        const auxData = [ ...filters ];
        const editIndex = auxData.map(item => item.index).indexOf(index);
        if (editIndex !== -1) {
            auxData[editIndex].operator = event.target.value;
        }

        setFilters(auxData);
    };

    const handlerChangeValue = (event, index) => {
        const auxData = [ ...filters ];
        const editIndex = auxData.map(item => item.index).indexOf(index);
        if (editIndex !== -1) {
            auxData[editIndex].value = event.target.value;
        }

        setFilters(auxData);
    };

    const handlerChangeSelectLogicOperator = (event, index) => {
        const auxData = [ ...filters ];
        const editIndex = auxData.map(item => item.index).indexOf(index);
        if (editIndex !== -1) {
            auxData[editIndex].logicOperator = event.target.value;
        }

        setFilters(auxData);
    };

    return [
        open_menu,
        anchorEl,
        handlerOpenMenu, handlerCloseMenu,
        filters,
        addFilter, removeFilter,
        handlerChangeSelectColumn,
        handlerChangeSelectOperator,
        handlerChangeValue,
        handlerChangeSelectLogicOperator
    ];
}