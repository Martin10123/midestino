import { useEffect, useState } from "react";
import { TemplateMainAdministrador } from "../templates/TemplateMainAdministrador";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";
import { TablaAdministrador } from "../components/TablaAdministrador";

export const Administrador = () => {
  const [todasEmpresas, setTodasEmpresas] = useState([]);

  useEffect(() => {
    const getEmpresas = async () => {
      try {
        const response = await axios.get(urlGeneral + "/empresa/todas");

        setTodasEmpresas(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getEmpresas();
  }, []);

  return (
    <TemplateMainAdministrador>
      <section className="w-full">
        <div className="p-2 relative overflow-x-auto">
          <h2 className="text-3xl text-gray-700 font-bold mb-4">
            Bienvenido Administrador
          </h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre de la empresa
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ciudad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha fundación
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha registro
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dirección
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              {todasEmpresas.map((empresa) => (
                <TablaAdministrador
                  key={empresa.idEmpresa}
                  empresa={empresa}
                  setTodasEmpresas={setTodasEmpresas}
                />
              ))}
            </table>
          </div>
        </div>
      </section>
    </TemplateMainAdministrador>
  );
};
