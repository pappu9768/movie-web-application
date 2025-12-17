import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const RefreshHandler = ({ setIsNotAuthenticated }) => {
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('Tokens')) {
            setIsNotAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
                navigate('/main', { replace: true });
            }
        }
    }, [location, navigate, setIsNotAuthenticated])

    return (null)
}

export default RefreshHandler;
