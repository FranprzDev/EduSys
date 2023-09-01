import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import { ErrorContext } from "./ErrorContext";
import { JwtContext } from "./JwtContext";

const initialState = {
  nombreInst: '',
  mailInst: '',
  celularInst: '',
  showModalInst: false,
  openInstModal: () => {},
  closeInstModal: () => {},
};

const Context = createContext(initialState);

const InstProvider = ({ children }) => {
  const { openErrorModal } = useContext(ErrorContext);
  const { jwt } = useContext(JwtContext);
  const [nombreInst, setNombreInst] = useState(initialState.nombreInst);
  const [mailInst, setMailInst] = useState(initialState.mailInst);
  const [celularInst, setCelularInst] = useState(initialState.celularInst);
  const [showModalInst, setShowModalInst] = useState(initialState.showModalInst);

  const openInstModal = () => {
    setShowModalInst(true);
  };

  const closeInstModal = () => {
    setShowModalInst(false);
  };

  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch(`${API_URL}inst/get-inst`);
      const data = await response.json();

      setNombreInst(data.institucion[0].nombreInst);
      setMailInst(data.institucion[0].mailInst);
      setCelularInst(data.institucion[0].celularInst);
      
      if(data.nombreInst === "" || data.mailInst === "" || data.celularInst === "") {
          openInstModal()
      }

    } catch (error) {
      openErrorModal(error.message)
    }
  };


  const handleCreateInstitution = async (nombreTentativo, celularTentativo, mailTentativo) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      nombreInst: nombreTentativo,
      mailInst: mailTentativo,
      celularInst: celularTentativo,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(`${API_URL}inst/create-inst`, requestOptions);
      const result = await response.json();

      setNombreInst(result.nombreInst);
      setMailInst(result.mailInst);
      setCelularInst(result.celularInst);

      fetchDataFromBackend()

      // Almacenar en localStorage
      const institutionData = {
        nombreInst,
        mailInst,
        celularInst,
      };
      localStorage.setItem("key_inst", JSON.stringify(institutionData));

      closeInstModal();

      if (result.message === "Ya existe una institución creada.") {
        openErrorModal("Ya existe una institución creada.");
      }
    } catch (error) {
      closeInstModal();
      openErrorModal("¡Se produjo un error en la creación de la Institución!");
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <Context.Provider
      value={{
        nombreInst,
        mailInst,
        celularInst,
        handleCreateInstitution,
        showModalInst,
        openInstModal,
        closeInstModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { InstProvider, Context as InstContext };
