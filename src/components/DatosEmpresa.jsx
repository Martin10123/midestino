import { PropTypes } from "prop-types";

export const DatosEmpresa = ({ formState, onInputChange }) => {
  return (
    <section className="">
      <h2 className="text-xl font-semibold mb-4">
        1. Datos Generales de la Empresa
      </h2>

      <form id="datosEmpresaForm">
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre de la Empresa
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Nombre de la Empresa..."
            value={formState.nombre}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="razonSocial"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razón Social
          </label>
          <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Razón Social..."
            value={formState.razonSocial}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="nit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            NIT
          </label>
          <input
            type="text"
            id="nit"
            name="nit"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="NIT..."
            value={formState.nit}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sector"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sector de la Empresa
          </label>
          <input
            type="text"
            id="sector"
            name="sector"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Sector de la Empresa..."
            value={formState.sector}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fechaFundacion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fecha de Fundación
          </label>
          <input
            type="date"
            id="fechaFundacion"
            name="fechaFundacion"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Fecha de Fundación..."
            value={formState.fechaFundacion}
            onChange={onInputChange}
          />
        </div>
      </form>
    </section>
  );
};

DatosEmpresa.propTypes = {
  formState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
