import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const initalState = {
    email: undefined,
    jwt: undefined,
}

const Context = createContext({
    jwt: initalState,
    setJwt: () => {},
    destroySession: () => {},
});


const JwtProvider = ({ children }) => {
    const [jwt, setJwt] = useState(initalState);
    
    const firstRender = () => {
        const token = localStorage.getItem("token");
        if(token){
            const decodedToken = jwtDecode(token);
            setJwt({
                email: decodedToken.email,
                token: token,
            });
        }
    }


    const destroySession = () => {
        localStorage.removeItem("token");
        setJwt(initalState);
    }

    useEffect(() => {
        firstRender();
    },[])

    return (
        <Context.Provider value={{ jwt, setJwt, destroySession }}>
            {children}
        </Context.Provider>
    );
}

export default Context;
export { JwtProvider, Context as JwtContext};