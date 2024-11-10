import { useState } from "react";
import { ListaOpcionesEmpresa } from "../components/ListaOpcionesEmpresa";
import { DatosEmpresa } from "./../components/DatosEmpresa";
import { ContactoEmpresa } from "./../components/ContactoEmpresa";
import { LegabilidadEmpresa } from "./../components/LegabilidadEmpresa";
import { PropietariosEmpresa } from "./../components/PropietariosEmpresa";
import { DocumentosEmpresa } from "./../components/DocumentosEmpresa";
import { VeracidadEmpresa } from "./../components/VeracidadEmpresa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "./../hooks/useForm";
import toast from "react-hot-toast";
import axios from "axios";
import { urlGeneral } from "./../helpers/apiUrls";

export const RegistroEmpresa = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const { formState, onInputChange } = useForm({
    nombre: "Empresa de Ejemplo S.A.S.",
    razonSocial: "Ejemplo S.A.S.",
    nit: "900123456-7",
    sector: "Tecnología",
    fechaFundacion: "2010-05-20", // Formato YYYY-MM-DD
    direccion: "Calle Falsa 123",
    ciudad: "Ciudad de Ejemplo",
    telefono: "3001234567",
    correo: "contacto@ejemplo.com",
    web: "www.ejemplo.com",
    numeroRegistroMercantil: "123456789",
    fechaRegistro: "2010-06-01",
    entidadRegistro: "Cámara de Comercio de Ejemplo",
    tipoSociedad: "Sociedad por Acciones Simplificada",
    nombreRepresentanteLegal: "Juan Pérez",
    numeroDocumentoRepresentanteLegal: "1234567890",
    cargoPropietario: "Gerente General",
    nombrePropietarioPrincipal: "Ana Gómez",
    certificadoExistencia: "",
    RUT: "",
    estadosFinancieros: "",
    notariaRegistro: "Notaría Ejemplo",
    otrosDocumentosLegales: "",
    confirmacion: false,
    firmaRepresentanteLegal: "firma_jp.png",
    fechaFirma: "2024-11-03", // Formato YYYY-MM-DD
    contrasena: "ContrasenaSegura123",
  });

  const tabContents = {
    1: <DatosEmpresa formState={formState} onInputChange={onInputChange} />,
    2: <ContactoEmpresa formState={formState} onInputChange={onInputChange} />,
    3: (
      <LegabilidadEmpresa formState={formState} onInputChange={onInputChange} />
    ),
    4: (
      <PropietariosEmpresa
        formState={formState}
        onInputChange={onInputChange}
      />
    ),
    5: <DocumentosEmpresa onInputChange={onInputChange} />,
    6: <VeracidadEmpresa formState={formState} onInputChange={onInputChange} />,
  };

  // Función de validación para verificar los campos requeridos
  const validateFields = () => {
    switch (activeTab) {
      case 1:
        return (
          formState.nombre.trim() !== "" &&
          formState.razonSocial.trim() !== "" &&
          formState.nit.trim() !== "" &&
          formState.sector.trim() !== "" &&
          formState.fechaFundacion.trim() !== ""
        );
      case 2:
        return (
          formState.direccion.trim() !== "" &&
          formState.ciudad.trim() !== "" &&
          formState.telefono.trim() !== "" &&
          formState.correo.trim() !== "" &&
          formState.web.trim() !== ""
        );
      case 3:
        return (
          formState.numeroRegistroMercantil.trim() !== "" &&
          formState.fechaRegistro.trim() !== "" &&
          formState.entidadRegistro.trim() !== "" &&
          formState.tipoSociedad.trim() !== ""
        );
      case 4:
        return (
          formState.nombrePropietarioPrincipal.trim() !== "" &&
          formState.cargoPropietario.trim() !== "" &&
          formState.numeroDocumentoRepresentanteLegal.trim() !== ""
        );
      case 5:
        return true;
      case 6:
        return (
          formState.firmaRepresentanteLegal.trim() !== "" &&
          formState.fechaFirma.trim() !== "" &&
          formState.contrasena.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateFields()) {
      if (activeTab < 6) {
        setActiveTab(activeTab + 1);
      }
    } else {
      toast.error("Por favor completa todos los campos requeridos");
    }
  };

  const handleBack = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  const onGuardarEmpresa = async () => {
    try {
      // Validación para 'nit'
      if (formState.nit.length < 6) {
        toast.error("El NIT debe ser un número válido.");
        return;
      }

      // Validación para 'nombre'
      if (formState.nombre.length < 2) {
        toast.error("El nombre debe tener al menos 2 caracteres.");
        return;
      }

      // Validación para 'correo'
      if (!/\S+@\S+\.\S+/.test(formState.correo)) {
        toast.error("El correo electrónico debe ser válido.");
        return;
      }

      // Validación para 'telefono'
      if (!/^\d{7,15}$/.test(formState.telefono)) {
        toast.error("El número de teléfono debe tener entre 7 y 15 dígitos.");
        return;
      }

      // Validación para 'fechaFundacion' y 'fechaRegistro'
      const today = new Date();
      const fechaFundacion = new Date(formState.fechaFundacion);
      const fechaRegistro = new Date(formState.fechaRegistro);

      if (fechaFundacion > today) {
        toast.error("La fecha de fundación no puede ser en el futuro.");
        return;
      }

      if (fechaRegistro > today) {
        toast.error("La fecha de registro no puede ser en el futuro.");
        return;
      }

      // Validación para 'contrasena'
      if (formState.contrasena.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      // Validación para 'nombreRepresentanteLegal'
      if (formState.nombreRepresentanteLegal.length < 2) {
        toast.error(
          "El nombre del representante legal debe tener al menos 2 caracteres."
        );
        return;
      }

      // Validación para 'cargoPropietario'
      if (formState.cargoPropietario.length < 2) {
        toast.error(
          "El cargo del propietario debe tener al menos 2 caracteres."
        );
        return;
      }

      // Validación para 'firmaRepresentanteLegal'
      if (!formState.firmaRepresentanteLegal) {
        toast.error("La firma del representante legal es obligatoria.");
        return;
      }

      if (!formState.confirmacion) {
        toast.error(
          "Debes aceptar la declaración de veracidad para continuar."
        );
        return;
      }

      // Si todas las validaciones pasan, se crea el objeto empresa
      const empresa = {
        nombre: formState.nombre,
        razonSocial: formState.razonSocial,
        nit: formState.nit,
        sector: formState.sector,
        fechaFundacion: formState.fechaFundacion,
        direccion: formState.direccion,
        ciudad: formState.ciudad,
        telefono: formState.telefono,
        correo: formState.correo,
        web: formState.web,
        numeroRegistroMercantil: formState.numeroRegistroMercantil,
        fechaRegistro: formState.fechaRegistro,
        entidadRegistro: formState.entidadRegistro,
        tipoSociedad: formState.tipoSociedad,
        nombreRepresentanteLegal: formState.nombreRepresentanteLegal,
        numeroDocumentoRepresentanteLegal:
          formState.numeroDocumentoRepresentanteLegal,
        cargoPropietario: formState.cargoPropietario,
        nombrePropietarioPrincipal: formState.nombrePropietarioPrincipal,
        certificadoExistencia: formState.certificadoExistencia,
        RUT: formState.RUT,
        estadosFinancieros: formState.estadosFinancieros,
        notariaRegistro: formState.notariaRegistro,
        otrosDocumentosLegales: formState.otrosDocumentosLegales,
        confirmacion: formState.confirmacion,
        firmaRepresentanteLegal: formState.firmaRepresentanteLegal,
        fechaFirma: formState.fechaFirma,
        contrasena: formState.contrasena,
        tipoUsuario: "Empresa",
      };

      const response = await axios.post(
        urlGeneral + "/empresa/agregar",
        empresa
      );

      if (response.data.valid) {
        toast.success(
          "Empresa registrada correctamente. Te notificaremos cuando tu cuenta sea activada por un administrador."
        );

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Error al registrarse", error.response);

      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="w-[80%] m-auto p-4">
      <div className="flex flex-col items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-5">
          Registro especial para empresas
        </h2>
        <p className="w-[60%] text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
          Bienvenido al portal de registro de empresas de nuestra agencia. Aquí
          podrás ingresar y gestionar toda la información relevante de tu
          empresa, incluyendo datos generales, contacto, legalidad,
          propietarios, y documentación. Este proceso asegura que nuestra
          plataforma cuente con toda la información necesaria para brindarte los
          mejores servicios personalizados.
        </p>

        <Link
          to="/"
          className="text-blue-500 hover:underline dark:text-blue-400 border-2 border-blue-5 dark:border-blue-400 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Pagina principal
        </Link>
      </div>

      <div className="flex h-full">
        <ListaOpcionesEmpresa activeTab={activeTab} />
        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          <div className="tabContent w-full rounded-lg dark:border-gray-600">
            {tabContents[activeTab]}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleBack}
              disabled={activeTab === 1}
              className={`${
                activeTab === 1 ? "opacity-50 cursor-not-allowed" : ""
              } text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              Volver
            </button>

            <button
              onClick={handleNext}
              disabled={activeTab === 6}
              className={`${
                activeTab === 6 ? "opacity-50 cursor-not-allowed" : ""
              } text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              Siguiente
            </button>

            <button
              id="saveButton"
              className={`${
                activeTab === 6 ? "" : "hidden"
              } text-white bg-blue-600 hover:bg-blue-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400`}
              onClick={onGuardarEmpresa}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
