import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDatoTarjeta } from "@/redux/slices/facturacionSlice";
import { InputModificado } from "../inputModificado/InputModificado";


const validarLuhn = (numero) => {
    let suma = 0;
    let alternar = false;
    for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero.charAt(i));
    if (alternar) {
        n *= 2;
        if (n > 9) n -= 9;
    }
    suma += n;
    alternar = !alternar;
    }
    return suma % 10 === 0;
};

const Tarjeta = ({ continuarCompra, nuemerotarjeta, error=null}) => {
    const dispatch = useDispatch()
    const [listoParaContinuar, setListoParaContinuar] = useState(false)
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [numeroCFormateado, setnumeroCFormateado] = useState("");
    const [mesVencimiento, setMesVencimiento] = useState("");
    const [anioVencimiento, setAnioVencimiento] = useState("");
    const [cvv, setCvv] = useState("");
    const inputRef = useRef(null)
    
    const [errores, setErrores] = useState({});

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    useEffect(() => {
        if (listoParaContinuar) {
            continuarCompra();
            setListoParaContinuar(false) // reset para futuras validaciones
        }
    }, [listoParaContinuar])

    const handleNumeroChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 19);
    const formateado = raw.replace(/(.{4})/g, "$1 ").trim();
    setNumeroTarjeta(raw);
    setnumeroCFormateado(formateado);
    if (errores.numeroTarjeta) setErrores((prev) => ({ ...prev, numeroTarjeta: null }));
    };

    const handleSubmit = async () => {
        const nuevosErrores = {};

        if (!numeroTarjeta.trim()) {
            nuevosErrores.numeroTarjeta = "Este campo es obligatorio";
        } else if (numeroTarjeta.length < 15 || numeroTarjeta.length > 16) {
            nuevosErrores.numeroTarjeta = "Debe tener entre 13 y 19 dígitos";
        } else if (!validarLuhn(numeroTarjeta)) {
            nuevosErrores.numeroTarjeta = "Número inválido";
        }

        const mes = parseInt(mesVencimiento);
        const anio = parseInt(anioVencimiento);
        if (!mes || mes < 1 || mes > 12) {
            nuevosErrores.fecha = "Mes inválido";
        }
        if (!anio || anio < anioActual || anio > anioActual + 20) {
            nuevosErrores.fecha = "Año inválido";
        } else if (anio === anioActual && mes < mesActual) {
            nuevosErrores.fecha = "La tarjeta está vencida";
        }

        if (!cvv.trim()) {
            nuevosErrores.cvv = "Este campo es obligatorio";
        } else if (!/^\d{3,4}$/.test(cvv)) {
            nuevosErrores.cvv = "Debe tener 3 o 4 dígitos";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        const mesFormateado = mesVencimiento.padStart(2, "0");
        dispatch(setDatoTarjeta({
            numeroTarjeta:numeroTarjeta, 
            cvv:cvv, 
            vencimiento:`${mesFormateado}/${anioVencimiento}`,
        }))
        nuemerotarjeta(numeroTarjeta);
        setListoParaContinuar(true)
        
    };

    const inputContainerClass = "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black flex items-center gap-x-4";
    const errorTextClass = "text-red-600 text-[11px] mt-1 px-1";

    return (
    <div className="w-full flex flex-col items-center justify-center mt-2">
        {error && <span className="text-red-600 text-[11px] mt-1 px-1 mb-3" >{error}</span>}
        <div className="w-full flex flex-col justify-center items-center gap-y-3.5">
        
        <div className="w-full flex flex-col justify-center items-center my-2.5">
          <InputModificado ref={inputRef} modoNumerico={true} label={"Número de tarjeta"} labelColor={"text-[#10004F]"} handler={handleNumeroChange} borderColorSelect={"border-[#10004F]"} placeHolder={"1234 5678 9012 3456"} value={numeroCFormateado} name={"membresia"}/>
            {errores.numeroTarjeta && <span className={errorTextClass}>{errores.numeroTarjeta}</span>}
        </div>

        {/* Fecha de expiración */}
        <div className="w-full flex justify-center items-center">
            <div className={"w-[90%] border border-[#e6e6e6] pl-2 focus-within:border-orange-400"}>
                <div className="flex flex-col items-start w-full">
                    <span className="font-medium text-[11px] text-[#666]">Fecha de expiración de Tarjeta</span>
                    <div className="flex items-center mt-1 gap gap-x-0.5">
                        <input
                            autoComplete="off"
                            type="number"
                            placeholder="MM"
                            min="1"
                            max="12"
                            maxLength={2}
                            value={mesVencimiento}
                            onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 2) {
                                setMesVencimiento(value);
                                if (value.length === 2) {
                                document.getElementById("anioInput")?.focus();
                                }
                            }
                            }}
                            className="w-[19%] text-[14px] focus:outline-none bg-white px-2 py-1"
                        />
                        <span className="text-[17px] font-semibold">/</span>
                        <input
                            id="anioInput"
                            autoComplete="off"
                            type="number"
                            placeholder="YYYY"
                            maxLength={4}
                            value={anioVencimiento}
                            onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 4) {
                                setAnioVencimiento(value);
                            }
                            }}
                            className="w-[35%] text-[14px] focus:outline-none  bg-white px-2 py-1"
                        />
                    </div>
                    {errores.fecha && <span className={errorTextClass}>{errores.fecha}</span>}
                </div>
            </div>
        </div>


        {/* CVV */}
        <div className="w-full flex flex-col justify-center items-center my-2.5">
            <InputModificado modoNumerico={true} label={"Código de seguridad (CVV)"} labelColor={"text-[#10004F]"} handler={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} borderColorSelect={"border-[#10004F]"} placeHolder={"123"} value={cvv} name={"membresiaCodigo"}/>
            {errores.cvv && <span className={errorTextClass}>{errores.cvv}</span>}
        </div>

        <button className="w-[90%] py-3 bg-[#D7192D] text-[13px] text-white" onClick={handleSubmit}>
            Pagar
        </button>
        </div>
    </div>
    );
};

export default Tarjeta;
