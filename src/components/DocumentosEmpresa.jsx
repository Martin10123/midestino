import { PropTypes } from "prop-types";

export const DocumentosEmpresa = ({ onInputChange }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">5. Documentación de Apoyo</h2>
      <form className="">
        <div className="mb-5">
          <label
            htmlFor="CertificadoExistencia"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Certificado de existencia
          </label>
          <input
            type="file"
            id="CertificadoExistencia"
            name="certificadoExistencia"
            placeholder="Certificado de existencia..."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="RUT"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            RUT
          </label>
          <input
            type="file"
            id="RUT"
            name="RUT"
            placeholder="RUT..."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="EstadosFinancieros"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Estados financieros
          </label>
          <input
            type="file"
            id="EstadosFinancieros"
            name="estadosFinancieros"
            placeholder="Estados financieros..."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="OtrosDocumento"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Otros documentos legales
          </label>
          <input
            type="file"
            id="OtrosDocumento"
            name="otrosDocumentosLegales"
            placeholder="Otros documentos legales..."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={onInputChange}
          />
        </div>
      </form>
    </section>
  );
};

DocumentosEmpresa.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};
