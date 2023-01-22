import React, { createContext } from 'react';
import useServer from '../hooks/useServer';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allContexts = useServer();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;