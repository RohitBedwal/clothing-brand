import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(authContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className='bg-white min-h-screen flex items-center justify-center'>
        <div className='w-[30px] h-[30px] border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
