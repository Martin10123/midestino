import { PropTypes } from "prop-types";

export const PropietariosEmpresa = ({ formState, onInputChange }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        4. Propietarios y Representante Legal
      </h2>
      <form>
        <div className="mb-5">
          <label
            htmlFor="representanteLegal"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre del representante legal
          </label>
          <input
            type="text"
            id="representanteLegal"
            name="nombreRepresentanteLegal"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Nombre del representante legal..."
            value={formState.nombreRepresentanteLegal}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="documentoRepresentante"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Número de documento del representante legal
          </label>
          <input
            type="text"
            id="documentoRepresentante"
            name="numeroDocumentoRepresentanteLegal"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Número de documento del representante legal..."
            value={formState.numeroDocumentoRepresentanteLegal}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="cargoRepresentante"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cargo del representante
          </label>
          <input
            type="text"
            id="cargoRepresentante"
            name="cargoPropietario"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Cargo del representante..."
            value={formState.cargoPropietario}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietarios"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre de los propietarios o accionistas principales
          </label>
          <input
            type="text"
            id="propietarios"
            name="nombrePropietarioPrincipal"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Propietarios o accionistas principales..."
            value={formState.nombrePropietarioPrincipal}
            onChange={onInputChange}
          />
        </div>
      </form>
    </section>
  );
};

PropietariosEmpresa.propTypes = {
  formState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
