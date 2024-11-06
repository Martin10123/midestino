import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "./../context/UsuarioContext";
import { PropTypes } from "prop-types";

export const RutasPrivadas = ({
  children,
  tipoUsuarioRequerido,
  excluirTipoUsuario,
}) => {
  const { usuarioActivo } = useContext(UsuarioContext);

  // Redirigir si el tipo de usuario coincide con el excluido
  if (excluirTipoUsuario && usuarioActivo.tipoUsuario === excluirTipoUsuario) {
    return <Navigate to="/" />;
  }

  // Redirigir si el tipo de usuario no coincide con el requerido
  if (
    tipoUsuarioRequerido &&
    usuarioActivo.tipoUsuario !== tipoUsuarioRequerido
  ) {
    return <Navigate to="/" />;
  }

  // Permitir acceso si cumple las condiciones
  return children;
};

RutasPrivadas.propTypes = {
  children: PropTypes.node.isRequired,
  tipoUsuarioRequerido: PropTypes.string,
  excluirTipoUsuario: PropTypes.string,
};
