import { useContext, useEffect, useState } from "react";
import { PlanesEmpresaContext } from "./PlanesEmpresaContext";
import { PropTypes } from "prop-types";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";
import { UsuarioContext } from "./UsuarioContext";

export const PlanesEmpresaProvider = ({ children }) => {
  const { usuarioActivo } = useContext(UsuarioContext);
  const [planesEmpresas, setPlanesEmpresas] = useState([]);
  const [planesEmpresa, setPlanesEmpresa] = useState([]);

  useEffect(() => {
    if (!usuarioActivo.idEmpresa) {
      return;
    }

    const obtenerPlanes = async () => {
      try {
        const response = await axios.get(
          `${urlGeneral}/planes/empresa/${usuarioActivo.idEmpresa}`
        );

        if (response.data.valid) {
          setPlanesEmpresa(response.data.planesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPlanes();
  }, [usuarioActivo.idEmpresa]);

  useEffect(() => {
    if (usuarioActivo.idEmpresa) {
      return;
    }

    const obtenerTodosPlanes = async () => {
      try {
        const response = await axios.get(`${urlGeneral}/planes/todos`);

        if (response.data.valid) {
          setPlanesEmpresas(response.data.planesList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTodosPlanes();
  }, [usuarioActivo.idEmpresa]);

  return (
    <PlanesEmpresaContext.Provider
      value={{
        planesEmpresas,
        setPlanesEmpresas,
        planesEmpresa,
        setPlanesEmpresa,
      }}
    >
      {children}
    </PlanesEmpresaContext.Provider>
  );
};

PlanesEmpresaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
