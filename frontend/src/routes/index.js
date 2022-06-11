import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import WebLayout from "@layouts/web";
import SignIn from "@pages/auth/SignIn";
import SignUp from "@pages/auth/SignUp";
import Welcome from "@pages/web/Welcome";
import Error404Page from "@pages/error/Error404";
import { setCredential } from "@store/slices/auth.slice";

const MainRoutes = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    let isLoggined = !!(auth.username || auth.wallet_address);

    const authRedirect = element => {
        if (isLoggined)
          return element;
        return <Navigate to="/login" />
    }

    if (localStorage.jwtToken && !isLoggined) {
        try {
          const decoded = jwt_decode(localStorage.jwtToken);
          isLoggined = true;
          dispatch(setCredential(decoded));
          
          return null;
        } catch (err) {
          
        }
    }

    return (
        <Router>
            <WebLayout>
                <Routes>
                    <Route index element={isLoggined ? <Navigate to="/welcome" /> : <Navigate to="/login" />} />
                    <Route path='/welcome' exact element={authRedirect(<Welcome />)} />
                    <Route path='/login' exact element={<SignIn />} />
                    <Route path='/register' exact element={<SignUp />} />
                    <Route path='/*' element={<Error404Page />} />
                </Routes>
            </WebLayout>
        </Router>
    );
};

export default MainRoutes;