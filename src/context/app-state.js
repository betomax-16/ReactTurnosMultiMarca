import { useReducer } from 'react';
import AppReducer from './app-reducer';
import AppContext from './app-context';

const AppState = (props) => {
    const initialState = {
        socket: null
    };
        
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const setSocket = async(socket) => {
        dispatch({
            type: 'SET_SOCKET',
            payload: socket
        });
    }

    return (
        <AppContext.Provider value={{
            socket: state.socket,
            setSocket
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppState;
