import React from 'react';
import LoginForm from './loginform';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <LoginForm onLogin={onLogin}/>
    </div>
  );
};

export default LoginPage;
