import { PropTypes } from "prop-types";
import { useForm } from "./../hooks/useForm";
import toast from "react-hot-toast";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";
import { PlanesEmpresaContext } from "../context/PlanesEmpresaContext";
import { useContext } from "react";

export const AgregarSitioEmpresa = ({
  handleAbrirModalCrearActividad,
  editData,
}) => {
  const { setPlanesEmpresa } = useContext(PlanesEmpresaContext);
  const { formState, onInputChange } = useForm({
    imagen: null,
    nombre: editData ? editData.nombre : "",
    tipoSitio: editData ? editData.tipoSitio : "",
    direccion: editData ? editData.direccion : "",
    horario: editData ? editData.horario : "9:00 AM - 10:00 PM",
    email: editData ? editData.email : "",
    pais: editData ? editData.pais : "",
    metodosPagoAceptados: editData ? editData.metodosPagoAceptados : "",
    telefono: editData ? editData.telefono : "",
    precio: editData ? editData.precio : "",
    cantidad: editData ? editData.cantidadDisponible : "",
    informacionGeneral: editData ? editData.informacionGeneral : "",
    valoracionPromedio: editData ? editData.valoracionPromedio : 0,
  });

  const validateForm = () => {
    if (!formState.imagen && !editData) {
      toast.error("La imagen del sitio es obligatoria.");
      return false;
    }

    if (!formState.nombre) {
      toast.error("El nombre del sitio es obligatorio.");
      return false;
    }
    if (!formState.direccion) {
      toast.error("La dirección es obligatoria.");
      return false;
    }
    if (!formState.horario) {
      toast.error("El horario es obligatorio.");
      return;
    }
    if (!formState.email) {
      toast.error("El correo electrónico es obligatorio.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      toast.error("El correo electrónico no es válido.");
      return false;
    }
    if (!formState.telefono) {
      toast.error("El teléfono es obligatorio.");
      return false;
    }
    if (!formState.precio) {
      toast.error("El precio es obligatorio.");
      return false;
    } else if (isNaN(formState.precio) || formState.precio <= 0) {
      toast.error("El precio debe ser un número mayor a 0.");
      return false;
    }
    if (!formState.pais) {
      toast.error("el pais es obligatorio");
      return false;
    }
    if (!formState.metodosPagoAceptados) {
      toast.error("el metodo de pago es obligatorio");
      return false;
    }
    if (!formState.cantidad) {
      toast.error("La cantidad es obligatoria.");
      return false;
    } else if (isNaN(formState.cantidad) || formState.cantidad <= 0) {
      toast.error("La cantidad debe ser un número mayor a 0.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const empresaActiva = JSON.parse(localStorage.getItem("usuarioActivo"));

    const formData = new FormData();
    formData.append("imagen", formState.imagen);

    const data = {
      nombre: formState.nombre,
      tipoSitio: formState.tipoSitio,
      direccion: formState.direccion,
      horario: formState.horario,
      email: formState.email,
      pais: formState.pais,
      metodosPagoAceptados: formState.metodosPagoAceptados,
      telefono: formState.telefono,
      precio: formState.precio,
      cantidadDisponible: formState.cantidad,
      informacionGeneral: formState.informacionGeneral,
      empresaId: empresaActiva.idEmpresa,
      fechaRegistro: formatearFecha(),
    };

    if (editData) {
      data.id = editData.id; // Se agrega el ID para actualizar
    }

    formData.append(
      "plan",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    try {
      const response = editData
        ? await axios.put(`${urlGeneral}/planes/actualizar`, {
            ...editData,
            nombre: formState.nombre,
            tipoSitio: formState.tipoSitio,
            direccion: formState.direccion,
            horario: formState.horario,
            email: formState.email,
            pais: formState.pais,
            metodosPagoAceptados: formState.metodosPagoAceptados,
            telefono: formState.telefono,
            precio: formState.precio,
            cantidadDisponible: formState.cantidad,
            informacionGeneral: formState.informacionGeneral,
          })
        : await axios.post(`${urlGeneral}/planes/agregar`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (response.data.valid) {
        toast.success(
          editData
            ? "Actividad actualizada correctamente."
            : "Actividad creada correctamente."
        );

        setPlanesEmpresa((planes) => {
          if (editData) {
            return planes.map((plan) =>
              plan.id === editData.id ? response.data.planEmpresa : plan
            );
          } else {
            return [...planes, response.data.planEmpresa];
          }
        });

        handleAbrirModalCrearActividad();
      }
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
      toast.error(
        "Error al enviar el formulario. Inténtalo de nuevo. " + error.message
      );
    }
  };

  const formatearFecha = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed bg-[#00000069] top-0 right-0 left-0 z-50 justify-center flex items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-2xl h-[95%]">
        <div className="relative h-full overflow-auto bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editData ? "Actualizar" : "Agregar"} actividad
            </h3>
            <button
              type="button"
              onClick={handleAbrirModalCrearActividad}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <form
              id="formSitioEmpresa"
              className="form_agregar_sitio"
              onSubmit={handleSubmit}
            >
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Imagen del sitio
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  type="file"
                  name="imagen"
                  onChange={onInputChange}
                  disabled={editData}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre del sitio
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  name="nombre"
                  placeholder="Nombre del sitio..."
                  value={formState.nombre}
                  onChange={onInputChange}
                />
              </div>

              <div className="dividir_inputs grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tipo de actividad
                  </label>
                  <select
                    name="tipoSitio"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formState.tipoSitio}
                    onChange={onInputChange}
                  >
                    <option value="Restaurante">Restaurante</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Bar">Bar</option>
                    <option value="Café">Café</option>
                    <option value="Fiesta">Fiesta</option>
                    <option value="Carreras">Carreras</option>
                    <option value="Museo">Museo</option>
                    <option value="Cine">Cine</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Dirección
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    type="text"
                    name="direccion"
                    placeholder="Dirección..."
                    value={formState.direccion}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Horarios
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  name="horario"
                  placeholder="10:00 a.m. - 5:00 p.m..."
                  value={formState.horario}
                  onChange={onInputChange}
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  type="email"
                  name="email"
                  placeholder="Correo..."
                  value={formState.email}
                  onChange={onInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pais
                  </label>
                  <select
                    name="pais"
                    id="pais"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={formState.pais}
                    onChange={onInputChange}
                  >
                    <option value="">Seleccione un país</option>
                    <option value="argentina">Argentina</option>
                    <option value="bolivia">Bolivia</option>
                    <option value="brasil">Brasil</option>
                    <option value="chile">Chile</option>
                    <option value="colombia">Colombia</option>
                    <option value="costa-rica">Costa Rica</option>
                    <option value="cuba">Cuba</option>
                    <option value="dominica">Dominica</option>
                    <option value="ecuador">Ecuador</option>
                    <option value="el-salvador">El Salvador</option>
                    <option value="espana">España</option>
                    <option value="estados-unidos">Estados Unidos</option>
                    <option value="mexico">México</option>
                    <option value="nicaragua">Nicaragua</option>
                    <option value="paraguay">Paraguay</option>
                    <option value="peru">Perú</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="venezuela">Venezuela</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Método de Pago
                  </label>
                  <select
                    name="metodosPagoAceptados"
                    id="metodosPagoAceptados"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={formState.metodosPagoAceptados}
                    onChange={onInputChange}
                  >
                    <option value="">Seleccione un método de pago</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cualquier forma">Cualquier forma</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Teléfono
                </label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  name="telefono"
                  placeholder="Teléfono..."
                  value={formState.telefono}
                  onChange={onInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Precio
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    type="number"
                    name="precio"
                    placeholder="Precio..."
                    value={formState.precio}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Cantidad
                  </label>
                  <input
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad..."
                    value={formState.cantidad}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Información General
                </label>
                <textarea
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  name="informacionGeneral"
                  placeholder="Información general..."
                  value={formState.informacionGeneral}
                  onChange={onInputChange}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {editData ? "Actualizar" : "Crear"} actividad
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AgregarSitioEmpresa.propTypes = {
  handleAbrirModalCrearActividad: PropTypes.func.isRequired,
  editData: PropTypes.object,
};
