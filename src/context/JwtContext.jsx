/* -> Importaciones */
import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const initalState = {
    id: undefined,
    email: undefined,
    jwt: undefined,
    nombre: undefined,
    apellido: undefined,
    direccion: undefined,
    dni: undefined,
    celular: undefined,
}

const Context = createContext({
    id: '',
    jwt: '',
    setJwt: () => {},
    destroySession: () => {},
    nombre: '',
    apellido: '',
    direccion: '',
    dni: '',
    celular: '',
});


const JwtProvider = ({ children }) => {
    const [jwt, setJwt] = useState(initalState);
    
    const firstRender = () => {
        const token = localStorage.getItem("token");
        if(token){
            const decodedToken = jwtDecode(token);
            setJwt({
                id: decodedToken._id,
                token: token,
                nombre: decodedToken.nombre,
                apellido: decodedToken.contrasenia,
                direccion: decodedToken.direccion,
                dni: decodedToken.dni,
                celular: decodedToken.celular,
                email: decodedToken.mail,
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