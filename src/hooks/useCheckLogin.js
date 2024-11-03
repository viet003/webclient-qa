import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../ultils/containts';

const useCheckLogin = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const redirectLogin = useCallback(() => {
        if(!isLoggedIn) {
            navigate(path.LOGIN)
        } else {
            navigate(path.HOME)
        }
    }, [navigate]);

    useEffect(() => {
        if (!isLoggedIn) {
            redirectLogin();
        }
    }, [isLoggedIn, redirectLogin]);
};

export default useCheckLogin;