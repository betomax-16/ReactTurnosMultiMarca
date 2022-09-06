const reducer = (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case 'SET_SOCKET':
            return {
                ...state,
                socket: payload
            }
        default:
            return state;
    }
}

export default reducer