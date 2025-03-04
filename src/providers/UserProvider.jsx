import { UserContext } from "../contexts/UserContext";
import { useState } from "react";

export default function UserProvider({children}) {
    const [hostId] = useState(1);
    const [guestId] = useState(2);
    
    return (
        <UserContext.Provider value={{  hostId, guestId }}>
            {children}
        </UserContext.Provider>
    )
};