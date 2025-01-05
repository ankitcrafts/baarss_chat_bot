/* eslint-disable react/prop-types */
import /*  React, */ { createContext, useState, /* useContext */ } from 'react';

// Create a context for the user i.e. UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

