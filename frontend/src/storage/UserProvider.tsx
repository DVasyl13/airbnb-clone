import React, { createContext, useState } from 'react';
import {AppUser} from "../types/AppUser";

export interface UserContextType {
    user: AppUser | null;
    setUser: (user: AppUser | null) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AppUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};