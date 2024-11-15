import { PropTypes } from "prop-types";

export const ContactoEmpresa = ({ formState, onInputChange }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">2. Información de Contacto</h2>

      <form className="">
        <div className="mb-5">
          <label
            htmlFor="direccion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Dirección Comercial
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Dirección Comercial..."
            value={formState.direccion}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="ciudad"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ciudad / Departamento
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Ciudad / Departamento..."
            value={formState.ciudad}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="telefono"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Teléfono
          </label>
          <input
            type="number"
            id="telefono"
            name="telefono"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Teléfono..."
            value={formState.telefono}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="correo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Correo Electrónico..."
            value={formState.correo}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="web"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Página Web
          </label>
          <input
            type="url"
            id="web"
            name="web"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Página Web (si aplica)..."
            value={formState.web}
            onChange={onInputChange}
          />
        </div>
      </form>
    </section>
  );
};

ContactoEmpresa.propTypes = {
  formState: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
