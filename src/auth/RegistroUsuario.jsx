import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlGeneral } from "../helpers/apiUrls";
import axios from "axios";
import { useForm } from "../hooks/useForm";
import toast from "react-hot-toast";
import { UsuarioContext } from "../context/UsuarioContext";

export const RegistroUsuario = () => {
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm({
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    numeroTelefono: "",
    email: "",
    nombreUsuario: "",
    contrasena: "",
    presupuesto: "",
    tipoUsuario: "Cliente",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [estaCargando, setEstaCargando] = useState(false);
  const { setUsuarioActivo, setIsUsuarioActivo } = useContext(UsuarioContext);

  const validateForm = () => {
    const errors = {};

    // Validación del nombre completo
    if (
      !formState.nombreCompleto.trim() ||
      formState.nombreCompleto.split(" ").length < 2
    ) {
      errors.nombreCompleto =
        "El nombre completo debe contener al menos dos palabras.";
    }

    // Validación del tipo de documento
    if (!formState.tipoDocumento) {
      errors.tipoDocumento = "Selecciona un tipo de documento.";
    }

    // Validación del número de documento
    if (!formState.numeroDocumento || isNaN(formState.numeroDocumento)) {
      errors.numeroDocumento =
        "El número de documento debe ser un número válido.";
    } else if (formState.numeroDocumento.length != 10) {
      // Ajusta según el tipo de documento
      errors.numeroDocumento = "El número de documento debe tener 10 dígitos.";
    }

    // Validación del número de teléfono
    if (
      !formState.numeroTelefono ||
      isNaN(formState.numeroTelefono) ||
      formState.numeroTelefono <= 0
    ) {
      errors.numeroTelefono =
        "El número de teléfono debe ser un número válido.";
    } else if (formState.numeroTelefono.length != 10) {
      // Ajusta según tu formato
      errors.numeroTelefono = "El número de teléfono debe tener 10 dígitos.";
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email || !emailRegex.test(formState.email)) {
      errors.email = "El email debe ser válido.";
    }

    // Validación del nombre de usuario
    if (!formState.nombreUsuario || formState.nombreUsuario.length < 3) {
      errors.nombreUsuario =
        "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    // Validación de la contraseña
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!formState.contrasena || !passwordRegex.test(formState.contrasena)) {
      errors.contrasena =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
    }

    // Validación del presupuesto
    if (
      !formState.presupuesto ||
      isNaN(formState.presupuesto) ||
      formState.presupuesto <= 0
    ) {
      errors.presupuesto = "El presupuesto debe ser un número positivo.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    setEstaCargando(true);

    try {
      const response = await axios.post(
        urlGeneral + "/cliente/agregar",
        formState
      );

      if (response.data.valid) {
        setResponseMessage(response.data.cliente.message);

        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(response.data.cliente)
        );

        setUsuarioActivo(response.data.cliente);
        setIsUsuarioActivo(true);

        toast.success(response.data.message);

        navigate("/inicio-clientes");
      } else {
        setResponseMessage(
          response.data.cliente.message || "Revise los datos ingresados."
        );
      }
    } catch (error) {
      console.log(error);

      setResponseMessage(
        error.response.data.message || "Error en el registro."
      );
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <>
      <div className="pb-5 pt-5 pl-16 text-blue-500 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        <Link to="/">Página principal</Link>
      </div>

      <section className="w-full h-screen p-4 grid grid-cols-2 items-center">
        <form
          className="w-[40rem] m-auto shadow-xl rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-center font-semibold text-gray-900 dark:text-white mb-5">
            Registro de Usuarios
          </h2>

          {responseMessage && (
            <div className="mb-5 text-center text-red-600">
              {responseMessage}
            </div>
          )}

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={formState.nombreCompleto}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.nombreCompleto ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              placeholder="Nombre completo..."
            />
            {formErrors.nombreCompleto && (
              <span className="text-red-500 text-sm">
                {formErrors.nombreCompleto}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tipo de documento
              </label>
              <select
                name="tipoDocumento"
                value={formState.tipoDocumento}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.tipoDocumento
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              >
                <option value="" disabled>
                  Selecciona un tipo de documento
                </option>
                <option value="Cedula">Cédula</option>
                <option value="Cedula extranjera">Cédula extranjera</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="RUC">RUC</option>
              </select>
              {formErrors.tipoDocumento && (
                <span className="text-red-500 text-sm">
                  {formErrors.tipoDocumento}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Número de documento
              </label>
              <input
                type="number"
                name="numeroDocumento"
                value={formState.numeroDocumento}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.numeroDocumento
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Número de documento..."
              />
              {formErrors.numeroDocumento && (
                <span className="text-red-500 text-sm">
                  {formErrors.numeroDocumento}
                </span>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Número de teléfono
            </label>
            <input
              type="tel"
              name="numeroTelefono"
              value={formState.numeroTelefono}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.numeroTelefono ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              placeholder="Número de teléfono..."
            />
            {formErrors.numeroTelefono && (
              <span className="text-red-500 text-sm">
                {formErrors.numeroTelefono}
              </span>
            )}
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              placeholder="tu_email@gmail.com"
            />
            {formErrors.email && (
              <span className="text-red-500 text-sm">{formErrors.email}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre de usuario
              </label>
              <input
                type="text"
                name="nombreUsuario"
                value={formState.nombreUsuario}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.nombreUsuario
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Nombre de usuario..."
              />
              {formErrors.nombreUsuario && (
                <span className="text-red-500 text-sm">
                  {formErrors.nombreUsuario}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                name="contrasena"
                value={formState.contrasena}
                onChange={onInputChange}
                className={`shadow-sm bg-gray-50 border ${
                  formErrors.contrasena ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                placeholder="Contraseña..."
              />
              {formErrors.contrasena && (
                <span className="text-red-500 text-sm">
                  {formErrors.contrasena}
                </span>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Presupuesto
            </label>
            <input
              type="number"
              name="presupuesto"
              value={formState.presupuesto}
              onChange={onInputChange}
              className={`shadow-sm bg-gray-50 border ${
                formErrors.presupuesto ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              placeholder="Presupuesto..."
            />
            {formErrors.presupuesto && (
              <span className="text-red-500 text-sm">
                {formErrors.presupuesto}
              </span>
            )}
          </div>

          <div className="flex justify-end mb-5">
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/ingresar"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Inicia sesión
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={estaCargando}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {estaCargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <figure>
          <img
            className="w-[90%] object-cover"
            src="/src/images/iniciarSesion.svg"
            alt="Imagen de registro de usuarios"
          />
        </figure>
      </section>
    </>
  );
};
