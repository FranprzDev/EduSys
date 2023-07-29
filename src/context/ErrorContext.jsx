/* -> Importaciones */
import { createContext, useState } from "react";
const initialState = {
    message: 'Ha ocurrido un error',
    showModalError: false,
    openErrorModal: () => {},
    closeErrorModal: () => {},
}

const Context = createContext(initialState);


const ErrorProvider = ({ children }) => {
    const [message, setMessage] = useState(initialState.message);
    const [showModalError, setShowModalError] = useState(initialState.showModalError)

    const openErrorModal = (m) => {
        setShowModalError(true);
        setMessage(m)
    }

    const closeErrorModal = () => {
        setShowModalError(false);
        setMessage(initialState.message)
    }

    return (
        <Context.Provider value={{ message, showModalError, openErrorModal, closeErrorModal }}>
            {children}
        </Context.Provider>
    );
}

export default Context;
export { ErrorProvider, Context as ErrorContext};