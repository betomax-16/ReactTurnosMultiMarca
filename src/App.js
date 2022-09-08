import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes/index";
import { useSelector, useDispatch } from 'react-redux';
import { closeAlert } from './redux/splices/alertSlice';
import { NotFound } from "./components/notFound/notFound";

const StackAlert = styled(Stack)`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10000;
`

const CollapseAlert = styled(Collapse)`
    margin-top: 2px !important;
`

function App() {
  const alerts = useSelector((state) => state.alert.list);
  const dispatch = useDispatch()

  return (<>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {routes.map((route, i) => {
        // const auxProps = {...props, ...route.props};
        return <Route key={i}
            path={route.path}
            element={<route.component {...route.props} routes={route.routes}/>}
        />
      })}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <StackAlert spacing={2}>
      {alerts.map((alert, index) => <CollapseAlert key={index} in={alert.visible}>
          <Alert severity={alert.severity} onClose={() => {dispatch(closeAlert(alert))}}>{alert.message}</Alert>
      </CollapseAlert>)} 
    </StackAlert>
  </>);
}

export default App;
