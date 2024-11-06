import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { urlGeneral } from "../helpers/apiUrls";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

export const IniciarSesion = () => {
  const { setUsuarioActivo, setIsUsuarioActivo } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const { formState, onInputChange } = useForm({
    correo: "",
    contrasena: "",
    tipoUsuario: "",
  });

  const onIniciarSesion = async (e) => {
    e.preventDefault();

    if (
      formState.correo.trim() === "" ||
      formState.contrasena.trim() === "" ||
      formState.tipoUsuario.trim() === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      let response;

      if (formState.tipoUsuario === "Empresa") {
        response = await axios.post(urlGeneral + "/empresa/iniciar-sesion", {
          correo: formState.correo,
          contrasena: formState.contrasena,
        });

        if (response.data.empresa) {
          localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(response.data.empresa)
          );

          setUsuarioActivo(response.data.empresa);
          setIsUsuarioActivo(true);
        }

        navigate("/inicio-empresas");
      } else {
        response = await axios.post(urlGeneral + "/cliente/iniciar-sesion", {
          email: formState.correo,
          contrasena: formState.contrasena,
        });

        if (response.data.cliente) {
          localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(response.data.cliente)
          );

          setUsuarioActivo(response.data.cliente);
          setIsUsuarioActivo(true);
        }

        if (formState.tipoUsuario === "Administrador") {
          navigate("/inicio-administradores");
        } else {
          navigate("/inicio-clientes");
        }
      }

      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.log("Error al iniciar sesión", error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="pb-5 pt-5 pl-16 text-blue-500 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        <Link to="/">Página principal</Link>
      </div>

      <section className="w-full h-screen p-4 grid grid-cols-2 items-center">
        <form
          className="w-[27rem] m-auto shadow-xl rounded-md p-4"
          onSubmit={onIniciarSesion}
        >
          <h2 className="text-4xl text-center font-semibold text-gray-900 dark:text-white mb-5">
            Iniciar sesión
          </h2>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tipo de usuario
            </label>
            <select
              id="tipoUsuario"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="tipoUsuario"
              value={formState.tipoUsuario}
              onChange={onInputChange}
            >
              <option value="" disabled>
                Selecciona
              </option>
              <option value="Administrador">Administrador</option>
              <option value="Empresa">Empresa</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="luis@gmail.com..."
              name="correo"
              value={formState.correo}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="contraseña..."
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="contrasena"
              value={formState.contrasena}
              onChange={onInputChange}
            />
          </div>

          <div className="flex justify-end mb-5">
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Aún no tienes cuenta?{" "}
              <Link
                to="/tipo-usuario"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Registrate
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Iniciar sesión
          </button>
        </form>

        <figure className="">
          <img
            className="w-[90%] object-cover"
            src="/src/images/iniciarSesion.svg"
            alt="images iniciarSesion"
          />
        </figure>
      </section>
    </>
  );
};
