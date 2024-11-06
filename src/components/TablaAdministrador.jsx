import { PropTypes } from "prop-types";
import { ModalAprobarEmpresa } from "./ModalAprobarEmpresa";
import { useState } from "react";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";
import toast from "react-hot-toast";

export const TablaAdministrador = ({ empresa, setTodasEmpresas }) => {
  const [empresaAprobar, setEmpresaAprobar] = useState({});
  const [abrirModalAprobar, setAbrirModalAprobar] = useState(false);
  const [validationMessage, setValidationMessage] = useState(
    "Verificando información..."
  );

  const validationMessages = [
    "Validando datos...",
    "Revisando base de datos...",
    "Comprobando documentos...",
    "Comprobando registros...",
  ];

  const onAprobarEmpresa = (fueAceptada, empresaAprobar) => {
    setAbrirModalAprobar(true);
    setEmpresaAprobar(empresaAprobar);
    let messageIndex = 0;

    // Change the validation message every 2 seconds
    const messageInterval = setInterval(() => {
      setValidationMessage(validationMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % validationMessages.length;
    }, 2000);

    // Display modal for 10 seconds before making the API call
    setTimeout(async () => {
      clearInterval(messageInterval);
      setAbrirModalAprobar(false);

      try {
        const response = await axios.put(
          urlGeneral + `/empresa/actualizar/${empresa.idEmpresa}`,
          {
            ...empresa,
            empresaFueAceptada: fueAceptada,
            empresaTuvoRespuesta: true,
          }
        );

        if (response.data.valid) {
          setTodasEmpresas((prevEmpresas) => {
            return prevEmpresas.map((empresa) => {
              if (empresa.idEmpresa === response.data.empresa.idEmpresa) {
                return response.data.empresa;
              }
              return empresa;
            });
          });
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Hubo un error en la aprobación de la empresa.");
      } finally {
        setEmpresaAprobar({});
      }
    }, 10000);
  };

  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          {!empresa.empresaTuvoRespuesta && (
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          )}
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {empresa.nombre}
        </th>
        <td className="px-6 py-4">{empresa.nit}</td>
        <td className="px-6 py-4">{empresa.correo}</td>
        <td className="px-6 py-4">{empresa.ciudad}</td>
        <td className="px-6 py-4">{empresa.fechaFundacion}</td>
        <td className="px-6 py-4">{empresa.fechaRegistro}</td>
        <td className="px-6 py-4">{empresa.telefono}</td>
        <td className="px-6 py-4">{empresa.direccion}</td>
        <td className="h-full px-6 py-4">
          {!empresa.empresaTuvoRespuesta ? (
            <div className="flex gap-4">
              <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => onAprobarEmpresa(true, empresa)}
              >
                Aprobar
              </button>
              <button
                className="font-medium text-blue-600 dark:text-blue-500 whitespace-nowrap hover:underline"
                onClick={() => onAprobarEmpresa(false, empresa)}
              >
                No Aprobar
              </button>
            </div>
          ) : (
            <p
              className={`${
                empresa.empresaFueAceptada ? "text-green-500" : "text-red-500"
              }`}
            >
              {empresa.empresaFueAceptada ? "Aprobada" : "No Aprobada"}
            </p>
          )}
        </td>
        <td className="flex absolute right-0 items-center px-6 py-4">
          {abrirModalAprobar && (
            <ModalAprobarEmpresa
              empresaSeleccionada={empresaAprobar}
              validationMessage={validationMessage}
            />
          )}
        </td>
      </tr>
    </tbody>
  );
};

TablaAdministrador.propTypes = {
  empresa: PropTypes.object.isRequired,
  setTodasEmpresas: PropTypes.func.isRequired,
};
