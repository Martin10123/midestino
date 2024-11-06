import { PropTypes } from "prop-types";
import { formatearAMonedaColombia } from "../helpers/herramientas";

export const TarjetaPlanes = ({ planEmpresa }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[720px] mx-auto">
        <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
            <img src={planEmpresa.imagen} alt={planEmpresa.nombre} />
          </div>
          <div className="p-6">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {planEmpresa.nombre}
            </h4>
            <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
              {planEmpresa.informacionGeneral}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Correo: {planEmpresa.email}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Telefono: {planEmpresa.telefono}
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Precio: {formatearAMonedaColombia(planEmpresa.precio)} pesos
            </p>
            <p className="block mt-2 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
              Cantidad disponibles: {planEmpresa.cantidadDisponible}
            </p>
          </div>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center -space-x-3">
              <img
                alt="natali craig"
                src={planEmpresa.imagen}
                className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              />
              <img
                alt="Tania Andrew"
                src={planEmpresa.imagen}
                className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              />
            </div>
            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
              Creada justo ahora
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TarjetaPlanes.propTypes = {
  planEmpresa: PropTypes.object.isRequired,
};
