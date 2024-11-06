import { TarjetaCompraPlanCliente } from "../components/TarjetaCompraPlanCliente";
import { TotalPlanes } from "../components/TotalPlanes";
import { TemplateMainCliente } from "../templates/TemplateMainCliente";

export const PlanesSeleccionadosCliente = () => {
  return (
    <TemplateMainCliente titulo="Carrito de compras">
      <section className="bg-white pb-8 antialiased dark:bg-gray-900 border-b">
        <div className="mx-auto px-6">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <TarjetaCompraPlanCliente />
            </div>

            <TotalPlanes />
          </div>
        </div>
      </section>
    </TemplateMainCliente>
  );
};
