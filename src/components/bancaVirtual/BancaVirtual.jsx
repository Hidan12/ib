import { useState } from "react";
import { useSelector } from "react-redux";
import { InputModificado } from "../inputModificado/InputModificado";


const BancaVirtual = ({ close, error=null}) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [errores, setErrores] = useState({});


    const handlerUsuario = (v) => setUsuario(v.target.value);
    const handlerClave = (v) => setClave(v.target.value);

    const handlerValidar = () => {
    const nuevosErrores = {};

    if (!usuario || usuario.trim().length < 4) {
        nuevosErrores.usuario = "El usuario debe tener al menos 4 caracteres.";
    }

    if (!clave || clave.trim().length < 4) {
        nuevosErrores.clave = "La clave debe tener al menos 4 caracteres.";
    }
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
        close(usuario, clave);
    }
    };

    return (
    <div className="w-full flex flex-col justify-center items-center mt-4 gap gap-y-4">
        {error && <span className="text-red-600 text-[11px] mt-1 px-1 mb-3">{error}</span>}
        {/* USUARIO */}
          <InputModificado label={"Usuario de banca virtual"} labelColor={"#10004F"} handler={handlerUsuario} borderColorSelect={"border-[#d7192d]"} placeHolder={"Usuario"} value={usuario} name={"usuario"} type="text"/>
          {errores.usuario && <span className="text-red-500 text-sm">{errores.usuario}</span>}
        

        {/* CLAVE */}
          <InputModificado label={"Clave"} type="password" labelColor={"#10004F"} handler={handlerClave} borderColorSelect={"border-[#d7192d]"} placeHolder={"Ingrese aquí su clave"} value={clave} name={"clave"}/>
          {errores.clave && <span className="text-red-500 text-sm">{errores.clave}</span>}

        {/* BOTÓN */}
        <div className="w-[90%]">
          <button onClick={handlerValidar} className="w-full py-3 bg-[#D7192D] font-medium text-[13px] text-white">
              Validar
          </button>
        </div>
    </div>
    );
};

export {BancaVirtual}