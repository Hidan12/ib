import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import "./cardVuelo.css"
import { useDispatch, useSelector } from "react-redux";
import { setCopiaPrecio, setPrecio, setPrecioClose, setVuelosSelecc } from "@/redux/slices/homeSlice";

function formatFecha(fechaString) {
  const fecha = new Date(fechaString);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  return `${dia} ${mes}`;
}

const CardVuelo = ({ vuelo, pos, setVueloSeleccionado, cambio = null, label }) => {
  const { codeCountry, money } = useSelector(state => state.country);
  const { cantPasajeros, tipViaje, copiaPrecio } = useSelector(state => state.homeReducer)
  const dispatch = useDispatch()    
  const horaSalida = format(parseISO(vuelo.horarios.salida), "h:mm a").toLowerCase();
  const horaLlegada = format(parseISO(vuelo.horarios.llegada), "h:mm a").toLowerCase();
  const [clickCard, setClickCard] = useState(false)
  const [selectTipo, setSelectTipo] = useState("")
  const [closeModal, setCloseModal] = useState(true)
  const [tarifaSeleccionada, setTarifaSeleccionada] = useState(null)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("")

  const handlerSelectTipo = (tipo) => {
    setSelectTipo(tipo)
    setCloseModal(false)
    setTarifaSeleccionada(null)
    setOpcionSeleccionada("")
  }

  const handlerClick = () => {
    setClickCard(c => !c)
  }

  const seleccionarTarifa = () => {
    if (!tarifaSeleccionada) return;

    const precioFinal = tarifaSeleccionada.precio;
    const tipoServicio = tarifaSeleccionada.tipo;

    const temp = {
      ...vuelo,
      precio: {
        ...vuelo.precio,
        formato: precioFinal.toLocaleString('es-CO'),
        total: precioFinal
      },
      tipoServicio: tipoServicio
    };

    dispatch(setPrecio(precioFinal));
    dispatch(setVuelosSelecc({tipoVuelo: vuelo.tipo_vuelo, vuelo: temp}))
    setVueloSeleccionado(temp);
    setClickCard(c => !c);
    setCloseModal(true);
  }

  const handleSeleccionOpcion = (precio, tipo, opcion) => {
    setTarifaSeleccionada({ precio, tipo });
    setOpcionSeleccionada(opcion);
    dispatch(setCopiaPrecio({precio: precio, tipoVuelo: vuelo.tipo_vuelo}))
    
  }

  useEffect(() => {
    if (!closeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [closeModal])

  return (
    <div className={`text-[#2f2f2f] ${!closeModal ? "fixed inset-0 top-20 left-0 w-[100vw] h-screen flex flex-col items-center bg-[#f3f2f6] z-10 overflow-y-auto" : "w-full rounded-xl shadow-sm relative bg-[#f3f2f6] overflow-hidden"}`}>
      {
        !cambio &&
        <div className={`p-4 mt-3 flex flex-col gap-1 items-start ${!closeModal ? "w-[95%] bg-white" : "w-full bg-white"}`}>
          {
            !closeModal && 
            <div className="w-full flex justify-between mb-1.5">
              <span className="text-[14px] font-medium">Tu vuelo de {vuelo.tipo_vuelo} <span className="text-gray-400">{formatFecha(vuelo.horarios.salida)}</span></span>
              <button onClick={() => (setCloseModal(c => !c), dispatch(setPrecioClose()))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </button>
            </div>
          }
          {/* Horarios */}
          <div className="w-full flex justify-between text-[25px] text-[#333] leading-none">
            <span className="font-[iberiaheadline] text-[#333]">{horaSalida}</span>
            <div className="flex flex-col items-center">
              <span className="text-[14px] text-gray-500">{vuelo.escalas}</span>
              <span className="text-[12px] text-gray-500">{vuelo.duracion.formato}</span>
            </div>
            <span className="font-[iberiaheadline]">{horaLlegada}</span>
          </div>

          {/* Ruta y duración */}
          <div className="w-full flex justify-between text-sm text-gray-500">
            <span>{vuelo.ruta.split("→")[0].trim()}</span>
            <span>{vuelo.ruta.split("→")[1].trim()}</span>
          </div>

          {/* Operado por */}
          <div className="mt-1 text-gray-500 flex items-center justify-between gap-x-1.5 w-full">
            <div className="flex flex-col w-[35%]">
              <p className="text-[10px] font-semibold text-gray-500">Operado por:</p>
              <img src="/assets/image/logo/logo2.png" className="w-full h-5 object-cover" alt="" />
            </div>

            <img src="/assets/image/logo/avios.png" className="w-[15%] object-contain" alt="" />
            
            <button onClick={() => handlerClick()} className=" font-[iberiaheadline] text-[14px] text-black flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
              <span className="pl-1">ver detalles</span>
            </button>
          </div>
          <button onClick={() => handlerClick()} className="pt-2 text-[14px] w-full text-gray-500 flex items-center justify-between gap-x-1.5">
            <span>Desde</span>
            <div className="text-[#c0424f] flex items-center">
              <span className="text-[#333] font-[iberiaheadline] text-[15px] font-semibold mr-2">{vuelo.precio.toLocaleString(`es-${codeCountry}`)} {money}</span>
              <div className={`${clickCard ? "rotate-180" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg>
              </div>
            </div>
          </button>
          
          {clickCard &&
            <div className="w-full mt-3">
              <div className="w-full">
                <button onClick={() => handlerSelectTipo("turismo")} className="w-full py-2 bg-[#777777] text-white text-[14px] flex justify-between">
                  <span className="pl-1.5">Turista</span>
                  <span className="text-white font-[iberiaheadline] text-[15px] mr-2">{vuelo.precio.toLocaleString(`es-${codeCountry}`)} {money}</span>
                </button>
                {
                  selectTipo == "turismo" && !closeModal &&
                  <div className="w-full flex flex-col bg-[#ddd] p-2 ">
                    <div className="w-full flex flex-col">
                      <div className="w-full bg-gray-100">
                        <div className="w-full bg-[#777777]">
                          <span className="text-white text-center text-[12px] block py-2">Asegúrate el mejor precio</span>
                        </div>
                        <div className="mt-2 flex flex-col p-2.5">
                          <span className="text-[14px] text-gray-500 font-bold ml-7">Básica</span>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name="turismo" 
                              className="w-5 h-5" 
                              checked={opcionSeleccionada === "basica"}
                              onChange={() => handleSeleccionOpcion(vuelo.precio, "Básica", "basica")}
                            />
                            <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{vuelo.precio.toLocaleString(`es-${codeCountry}`)} {money}</span>
                          </label>
                          <div className="ml-7">
                            <span className="px-1 bg-[#fcd100] text-black text-[13px]">{cantPasajeros > 1 ? "Quedan" : "Queda"} {cantPasajeros} {cantPasajeros > 1 ? "plazas" : "plaza"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-2.5 bg-gray-100">
                        <div className="w-full bg-[#777777]">
                          <span className="text-white text-center text-[12px] block py-2">Lleva tu maleta facturada</span>
                        </div>
                        <div className="mt-2 flex flex-col p-2.5">
                          <span className="text-[14px] text-gray-500 font-bold ml-7">Óptima</span>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name="turismo" 
                              className="w-5 h-5" 
                              checked={opcionSeleccionada === "optima"}
                              onChange={() => handleSeleccionOpcion(Math.round((vuelo.precio * 0.2) + vuelo.precio), "Óptima", "optima")}
                            />
                            <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{Math.round((vuelo.precio * 0.2) + vuelo.precio).toLocaleString(`es-${codeCountry}`)} {money}</span>
                          </label>
                          <div className="ml-7">
                            <span className="px-1 bg-[#fcd100] text-black text-[13px]">{cantPasajeros > 1 ? "Quedan" : "Queda"} {cantPasajeros} {cantPasajeros > 1 ? "plazas" : "plaza"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-2.5 bg-gray-100">
                        <div className="w-full bg-[#d7192d]">
                          <span className="text-white text-center text-[12px] block py-2"><span className="px-0.5 bg-white text-[#d7192d]">Nuevo</span> Lleva tu maleta facturada</span>
                        </div>
                        <div className="mt-2 flex flex-col p-2.5">
                          <span className="text-[14px] text-gray-500 font-bold ml-7">Puente Aéreo confort</span>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name="turismo" 
                              className="w-5 h-5" 
                              checked={opcionSeleccionada === "confort"}
                              onChange={() => handleSeleccionOpcion(Math.round((vuelo.precio * 0.4) + vuelo.precio), "Puente Aéreo confort", "confort")}
                            />
                            <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{Math.round((vuelo.precio * 0.4) + vuelo.precio).toLocaleString(`es-${codeCountry}`)} {money}</span>
                          </label>
                          <div className="ml-7">
                            <span className="px-1 bg-yellow-300 text-black text-[13px]">{cantPasajeros > 1 ? "Quedan" : "Queda"} {cantPasajeros} {cantPasajeros > 1 ? "plazas" : "plaza"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-2.5 bg-gray-100">
                        <div className="w-full bg-[#777777]">
                          <span className="text-white text-center text-[12px] block py-2">Cambia tu vuelo sin limitaciones</span>
                        </div>
                        <div className="mt-2 flex flex-col p-2.5">
                          <span className="text-[14px] text-gray-500 font-bold ml-7">Puente Aéreo Flexible</span>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name="turismo" 
                              className="w-5 h-5" 
                              checked={opcionSeleccionada === "flexible"}
                              onChange={() => handleSeleccionOpcion(Math.round((vuelo.precio * 2)), "Puente Aéreo Flexible", "flexible")}
                            />
                            <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{Math.round((vuelo.precio * 2)).toLocaleString(`es-${codeCountry}`)} {money}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <button onClick={() => handlerSelectTipo("business")} className="w-full mb-2 mt-2 py-2 bg-[#a20067] text-white text-[14px] flex justify-between">
                <span className="pl-1.5">Business Class</span>
                <span className="text-white font-[iberiaheadline] text-[15px] mr-2">{(vuelo.precio * 2).toLocaleString(`es-${codeCountry}`)} {money}</span>
              </button>
              {
                selectTipo == "business" && !closeModal &&
                <div className="w-full flex flex-col bg-[#ddd] p-2 ">
                  <div className="w-full flex flex-col">
                    <div className="w-full bg-gray-100">
                      <div className="w-full bg-[#a20067]">
                        <span className="text-white text-center text-[12px] block py-2">Experiencia business al mejor precio</span>
                      </div>
                      <div className="mt-2 flex flex-col p-2.5">
                        <span className="text-[14px] text-[#a20067] font-bold ml-7">Business Óptima</span>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="business" 
                            className="w-5 h-5" 
                            checked={opcionSeleccionada === "business-optima"}
                            onChange={() => handleSeleccionOpcion((vuelo.precio * 2), "Business Óptima", "business-optima")}
                          />
                          <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{(vuelo.precio * 2).toLocaleString(`es-${codeCountry}`)} {money}</span>
                        </label>
                        <div className="ml-7">
                          <span className="px-1 bg-[#fcd100] text-black text-[13px]">{cantPasajeros > 1 ? "Quedan" : "Queda"} {cantPasajeros} {cantPasajeros > 1 ? "plazas" : "plaza"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-2.5 bg-gray-100">
                      <div className="w-full bg-[#a20067]">
                        <span className="text-white text-center text-[12px] block py-2">Comodidad Business y un extra de flexibilidad</span>
                      </div>
                      <div className="mt-2 flex flex-col p-2.5">
                        <span className="text-[14px] text-[#a20067] font-bold ml-7">Business Confort</span>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="business" 
                            className="w-5 h-5" 
                            checked={opcionSeleccionada === "business-confort"}
                            onChange={() => handleSeleccionOpcion(Math.round((vuelo.precio * 2.2) + vuelo.precio), "Business Confort", "business-confort")}
                          />
                          <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{Math.round((vuelo.precio * 2.2) + vuelo.precio).toLocaleString(`es-${codeCountry}`)} {money}</span>
                        </label>
                        <div className="ml-7">
                          <span className="px-1 bg-[#fcd100] text-black text-[13px]">{cantPasajeros > 1 ? "Quedan" : "Queda"} {cantPasajeros} {cantPasajeros > 1 ? "plazas" : "plaza"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-2.5 bg-gray-100">
                      <div className="w-full bg-[#a20067]">
                        <span className="text-white text-center text-[12px] block py-2">Cambia tu vuelo sin limitaciones</span>
                      </div>
                      <div className="mt-2 flex flex-col p-2.5">
                        <span className="text-[14px] text-[#a20067] font-bold ml-7"> Business Puente Aéreo</span>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            name="business" 
                            className="w-5 h-5" 
                            checked={opcionSeleccionada === "business-puente"}
                            onChange={() => handleSeleccionOpcion(Math.round((vuelo.precio * 3)), "Business Puente Aéreo", "business-puente")}
                          />
                          <span className="ml-2 font-[iberiaheadline] text-[15px] font-semibold">{Math.round((vuelo.precio * 3)).toLocaleString(`es-${codeCountry}`)} {money}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      }
      {
        !closeModal &&
        <div className="w-[95%] bg-white flex flex-col p-2 mt-2.5">
          <span className="text-gray-500 text-[13px] font-medium">Precio {vuelo.tipo_vuelo == "vuelta" ? "total" : "Vuelo de ida"}</span>
          <span className="text-[#2f2f2f] text-[30px] font-[iberiaheadline]">
            {tarifaSeleccionada ? `${copiaPrecio.toLocaleString(`es-${codeCountry}`)} ${money}` : 'Selecciona una tarifa'}
          </span>
          <button 
            onClick={seleccionarTarifa} 
            disabled={!tarifaSeleccionada}
            className="w-full text-center text-white text-[14px] mt-1 py-2.5 bg-[#d7192d] disabled:bg-gray-400"
          >
            {tipViaje == "idaYVuelta" ? label=="Vuelta" ? "Rellenar datos de pasajeros":"Seleccionar vuelo de vuelta"  : "Rellenar datos de pasajeros"}
          </button>
          <span className="mt-4 text-[12px] text-gray-400 pb-4">
            Precio total, incluye tarifa aérea, tasas (salvo las que se cobren en determinados aeropuertos en el momento de facturar), gastos de gestión, cargos del operador, y las opciones seleccionadas. Consulta aquí posibles gastos de gestión para cambios y reembolsos.
          </span>
        </div>
      }
    </div>
  );
};

export default CardVuelo;