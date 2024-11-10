import { useContext } from "react";
import { TemplateMainCliente } from "../templates/TemplateMainCliente";
import { PlanesEmpresaContext } from "./../context/PlanesEmpresaContext";
import { TarjetaPlanes } from "./../components/TarjetaPlanes";

export const ClientePagina = () => {
  const { planesEmpresas, onEnviarValoracion, setPlanesEmpresa } =
    useContext(PlanesEmpresaContext);

  return (
    <TemplateMainCliente titulo="Planes">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 border-b items-start">
        {planesEmpresas.map((plan) => (
          <TarjetaPlanes
            key={plan.id}
            planEmpresa={plan}
            onEnviarValoracion={onEnviarValoracion}
            setPlanesEmpresa={setPlanesEmpresa}
          />
        ))}
      </div>
    </TemplateMainCliente>
  );
};
