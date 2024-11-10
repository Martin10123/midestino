import { useState } from "react";
import axios from "axios";
import { urlGeneral } from "../helpers/apiUrls";
import { formatearAMonedaColombia } from "../helpers/herramientas";
import { PropTypes } from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const TotalPlanes = ({
  carritoCompras,
  usuarioActivo,
  setCarritoCompras,
  setUsuarioActivo,
}) => {
  const [nombrePlan, setNombrePlan] = useState("");
  const navigate = useNavigate();

  // Calcular el precio original sin usar reduce
  let precioOriginal = 0;
  for (let i = 0; i < carritoCompras.length; i++) {
    precioOriginal += carritoCompras[i].precioTotal;
  }

  // Calcular el descuento basado en la cantidad de planes
  const cantidadPlanes = carritoCompras.length;
  let descuento = 0;

  if (cantidadPlanes >= 6) {
    descuento = 0.2; // 20% de descuento si tiene 6 o más planes
  } else if (cantidadPlanes >= 3) {
    descuento = 0.1; // 10% de descuento si tiene 3 o más planes
  }

  // Aplicar el descuento
  const precioConDescuento = precioOriginal * (1 - descuento);

  // Costo del envío fijo
  const envio = 10000;

  // Calcular el precio total final
  const precioFinal = precioConDescuento + envio;

  const presupuestoEsSuficiente = usuarioActivo.presupuesto < precioFinal;

  const onComprarPlanes = async () => {
    if (carritoCompras.length === 0) {
      // Verificar que el carrito de compras no esté vacío
      toast.error("No hay planes en el carrito de compras.");
      return;
    }

    if (nombrePlan.trim().length < 5) {
      // Verificar que el nombre de la compra tenga al menos 5 caracteres
      toast.error("El nombre de la compra debe tener al menos 5 caracteres.");
      return;
    }

    if (presupuestoEsSuficiente) {
      // Verificar si el presupuesto del usuario es suficiente
      toast.error("Tu presupuesto no es suficiente para completar la compra.");
      return;
    }

    try {
      const response = await axios.post(`${urlGeneral}/compras/agregar`, {
        nombrePlan,
        estado: "Comprado",
        nombrePlanes: carritoCompras.map((compra) => compra.planEmpresa.nombre),
        tipoSitios: carritoCompras.map(
          (compra) => compra.planEmpresa.tipoSitio
        ),
        direcciones: carritoCompras.map(
          (compra) => compra.planEmpresa.direccion
        ),
        cantidadesCompradas: carritoCompras.map((compra) => compra.cantidad),
        horarios: carritoCompras.map((compra) => compra.planEmpresa.horario),
        correos: carritoCompras.map((compra) => compra.planEmpresa.email),
        paises: carritoCompras.map((compra) => compra.planEmpresa.pais),
        telefonos: carritoCompras.map((compra) => compra.planEmpresa.telefono),
        imagenes: carritoCompras.map((compra) => compra.planEmpresa.imagen),
        precios: carritoCompras.map((compra) => compra.precioTotal),
        planesPorEmpresa: carritoCompras.map((compra) => compra.planEmpresa.id),
        informacionesGenerales: carritoCompras.map(
          (compra) => compra.planEmpresa.informacionGeneral
        ),
        empresas: carritoCompras.map((compra) => compra.planEmpresa.empresaId),
        cliente: {
          idCliente: usuarioActivo.idCliente,
        },
      });

      if (response.data.valid) {
        toast.success("Compra realizada con éxito!");

        const usuarioActualizado = {
          ...usuarioActivo,
          presupuesto: usuarioActivo.presupuesto - precioFinal,
        };

        setUsuarioActivo(usuarioActualizado);

        localStorage.removeItem("usuarioActivo");
        localStorage.setItem(
          "usuarioActivo",
          JSON.stringify(usuarioActualizado)
        );

        setCarritoCompras([]);
        navigate("/planes-comprados-clientes");
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error al procesar la compra." + error.message);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Total de planes
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Precio original
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {formatearAMonedaColombia(precioOriginal)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Descuento
              </dt>
              <dd className="text-base font-medium text-green-600">
                -{formatearAMonedaColombia(precioOriginal - precioConDescuento)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Planes incluidos
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {cantidadPlanes} {cantidadPlanes === 1 ? "plan" : "planes"}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Envío
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {formatearAMonedaColombia(envio)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd
              className={`text-base font-bold text-gray-900 dark:text-white ${
                presupuestoEsSuficiente
                  ? "text-base font-bold text-red-600"
                  : "text-base font-bold text-green-500"
              }`}
            >
              {formatearAMonedaColombia(precioFinal)}
            </dd>
          </dl>
        </div>

        <div className="flex items-center justify-center gap-2 pt-5">
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
            onClick={onComprarPlanes}
          >
            Comprar planes
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="voucher"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Cual es el nombre de este plan?
            </label>
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder="Plan 1..."
              value={nombrePlan}
              onChange={(e) => setNombrePlan(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

TotalPlanes.propTypes = {
  carritoCompras: PropTypes.array.isRequired,
  usuarioActivo: PropTypes.object.isRequired,
  setCarritoCompras: PropTypes.func.isRequired,
  setUsuarioActivo: PropTypes.func.isRequired,
};
