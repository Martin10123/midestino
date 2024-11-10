import axios from "axios";
import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { urlGeneral } from "./../helpers/apiUrls";
import { UsuarioContext } from "../context/UsuarioContext";
import toast from "react-hot-toast";

export const PresupuestoModal = ({ handleOpenModalPresuento }) => {
  const { usuarioActivo, setUsuarioActivo } = useContext(UsuarioContext);

  const [presupuesto, setPresupuesto] = useState(
    Number(usuarioActivo.presupuesto)
  );

  const onGuardarPresupuesto = async () => {
    if (presupuesto <= 0) {
      toast.error("El presupuesto no puede ser negativo");
      return;
    }

    try {
      const response = await axios.put(
        `${urlGeneral}/cliente/actualizar/${usuarioActivo.idCliente}`,
        {
          ...usuarioActivo,
          presupuesto,
        }
      );

      console.log(response.data);

      if (response.data.valid) {
        setUsuarioActivo(response.data.cliente);

        localStorage.removeItem("usuarioActivo");

        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(response.data.cliente)
        );

        toast.success("Presupuesto actualizado correctamente");

        handleOpenModalPresuento();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Ocurrió un error al actualizar el presupuesto" + error.response.data
      );
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 bg-[#00000069] right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Actualizar presupuesto
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleOpenModalPresuento}
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-2">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Presuesto
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Actualizar presupuesto..."
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
            />
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onGuardarPresupuesto}
            >
              Actualizar
            </button>
            <button
              onClick={handleOpenModalPresuento}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PresupuestoModal.propTypes = {
  handleOpenModalPresuento: PropTypes.func.isRequired,
};
