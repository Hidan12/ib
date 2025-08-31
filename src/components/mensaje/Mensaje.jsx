import { useState } from "react";
import { InputModificado } from "../inputModificado/InputModificado";

const Mensaje = ({close, label, min=4, max=10, error=null})=>{
    const [clave, setClave] = useState("");
    const [errores, setErrores] = useState({});


    
    const handlerClave = (v) => setClave(v.target.value);

    const handlerValidar = () => {
    const nuevosErrores = {};


    if (!clave || clave.trim().length < min && clave.trim().length < max) {
        nuevosErrores.clave = "La clave debe tener al menos 4 caracteres.";
    }
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
        close(clave);
    }
    };

    return (
    <div className="w-full flex flex-col justify-center mt-9 items-center gap gap-y-3">
        {error && <span className="text-red-600 text-[11px] mt-1 px-1 mb-3">{error}</span>}
        {/* CLAVE */}
          <InputModificado modoNumerico={label == "Clave de banca virtual" ? false: true} label={label}  type="password" labelColor={"#10004F"} handler={handlerClave} borderColorSelect={"border-[#E8114B]"} placeHolder={label} value={clave} name={"clave"}/>
            {errores.clave && <span className="text-red-500 mb-3.5 text-sm">{errores.clave}</span>}

        {/* BOTÓN */}
        <div className="w-[90%]">
            <button onClick={handlerValidar} className="w-full font-medium py-3 bg-[#D7192D] text-[13px] text-white" >
                Validar
            </button>
        </div>
    </div>
    );
}

export {Mensaje}