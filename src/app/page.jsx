"use client"
import { useDispatch, useSelector } from "react-redux"
import "./global.css"
import { useEffect, useRef, useState } from "react"
import { InputModificado } from "@/components/inputModificado/InputModificado"
import axios from "axios"
import { setCountryData } from "@/redux/slices/countrySlice"
import DateRangeSelector from "@/components/fecha/FechaInput"
import { cantidadPasajeros, changeDestino, changeOrigin, setCabina, tipoViaje } from "@/redux/slices/homeSlice"
import { useRouter } from "next/navigation"


const svgs = {
  lugar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
    </svg>
  )
}


const obtenerDestino = async (value, setValor) => {
  try {
    const city = await axios.post("/api/search", { search: value }, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      }
    });
    console.log(city.data.destinations);
    
    setValor(city.data.destinations);
  } catch (error) {
    console.error(error);
  }
};



const Pasajeros = ()=>{
  const {pasajeroAdulto, pasajeroNinio, pasajeroBebe} = useSelector(state => state.homeReducer)
  const [clickPasajero , setClickPasajero] = useState(false)
  const refPasajeros = useRef();
  const dispatch = useDispatch()
  const [error, setError] = useState(null);
  const [cantidades, setCantidades] = useState({
    adultos: pasajeroAdulto,
    ninos: pasajeroNinio,
    bebes: pasajeroBebe,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refPasajeros.current && !refPasajeros.current.contains(event.target)) {
        setClickPasajero(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  dispatch(cantidadPasajeros({
    pasajeroAdulto: cantidades.adultos,
    pasajeroNinio: cantidades.ninos,
    pasajeroBebe: cantidades.bebes
  }));
}, [cantidades, dispatch]);
  
  
  const handlerClicPasajero = ()=>{
    setClickPasajero(c => !c)
  }


  const cambiarCantidad = (tipo, operacion) => {
    setCantidades((prev) => {
      const nuevaCantidad =
        operacion === "sumar" ? prev[tipo] + 1 : Math.max(0, prev[tipo] - 1);
      if (error && totalPasajeros > 0) {
        setError(null);
      }
      return { ...prev, [tipo]: nuevaCantidad };
    });
  };



  return(
    <div className="w-[90%] flex flex-col border-b-2 gap gap-y-4 justify-center pb-5 border-b-[#e6e6e6]">
      <span>Pasajeros</span>
      <div ref={refPasajeros} className="relative">
        <div onClick={()=>handlerClicPasajero()} className={`flex relative justify-between px-3 py-3 border-2 ${clickPasajero ? "border-orange-400": "border-[#e6e6e6]"}`}>
          <span className="text-[#666]">{pasajeroAdulto} {pasajeroAdulto > 1 ? "Adultos": "Adulto"}{pasajeroNinio > 0 ? `, ${pasajeroNinio}`: ""} {pasajeroNinio > 0 ? pasajeroNinio > 1 ? "Niños": "Niño" : ""}{pasajeroBebe > 0 ? `, ${pasajeroBebe}`: ""} {pasajeroBebe > 0 ? pasajeroBebe > 1 ? "Bebés": "Bebé" : ""}</span>
          <span className={`transform transition-transform duration-300 text-gray-400`}>
            ▼
          </span>
        </div>
        {
          clickPasajero && (
          <div className="w-full left-0 top-16 shadow shadow-black/25 bg-white z-10 absolute flex flex-col gap-y-2 pl-2">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap gap-x-3">
                <span className="w-5 text-center text-[40px] text-[#666]">{cantidades.adultos}</span>
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#666]">Adulto</span>
                  <span className=" text-[11px] text-[#666]">Mas de 11 años</span>
                </div>
              </div>
              <div className="flex items-center">
                <button  disabled={cantidades.adultos === 1} onClick={() => cambiarCantidad("adultos", "restar")} className={`${cantidades.adultos  == 1 ? "text-gray-400 cursor-not-allowed": "text-[#e8114b]"}`}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button onClick={() => cambiarCantidad("adultos", "sumar")} className="text-[#e8114b]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap gap-x-3">
                <span className={`w-5 text-center text-[40px] ${cantidades.ninos == 0 ? "text-gray-200" : "text-[#666]"}`}>{cantidades.ninos}</span>
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#666]">Niño</span>
                  <span className=" text-[11px] text-[#666]">De 2 a 11 años</span>
                </div>
              </div>

              <div className="flex items-center">
                <button disabled={cantidades.ninos === 0} onClick={() => cambiarCantidad("ninos", "restar")} className={`${cantidades.ninos  == 0 ? "text-gray-400 cursor-not-allowed": "text-[#e8114b]"}`}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button onClick={() => cambiarCantidad("ninos", "sumar")} className="text-[#e8114b]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap gap-x-3">
                <span className={`w-5 text-center text-[40px] ${cantidades.bebes == 0 ? "text-gray-200" : "text-[#666]"}`}>{cantidades.bebes}</span>
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#666]">Bebé</span>
                  <span className=" text-[11px] text-[#666]">Menos de 2 años</span>
                </div>
              </div>

              <div className="flex items-center">
                <button disabled={cantidades.bebes === 0} onClick={() => cambiarCantidad("bebes", "restar")} className={`${cantidades.bebes  == 0 ? "text-gray-400 cursor-not-allowed": "text-[#e8114b]"}`}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button onClick={() => cambiarCantidad("bebes", "sumar")} className="text-[#e8114b]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
              </div>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}



const Tarifa = ()=>{
  const dispatch = useDispatch()
  const {cabina} = useSelector(state => state.homeReducer)
  const [clickTarifa, setClickTarifa] = useState(false)
  const [tarifaSelect, setTarifaSelect] = useState(cabina)
  const tarifas = ["Más Económica", "Turista Premium", "Business Class"]
  
  const handlerClickTarifa = ()=>{
    setClickTarifa(c => !c)
  }

  const handlerSelectTarifa = (value)=>{
    setTarifaSelect(value)
    handlerClickTarifa()
  }

  useEffect(()=>{
    dispatch(setCabina(tarifaSelect))
  },[tarifaSelect, dispatch])
  
  return(
    <div className="w-[90%] pb-4 flex flex-col border-b-2 gap gap-y-4 justify-center border-b-[#e6e6e6]">
      <span>Tarifas</span>
      <div className="relative">
        <div onClick={()=>handlerClickTarifa()} className={`w-full border border-[#e6e6e6] flex justify-between items-center relative pt-5 pb-3 pl-4 pr-4 transition-all duration-300 text-[#666] ${clickTarifa ? "border-orange-400": "border-[#e6e6e6]"}`}>
          <span className="text-[#666]">{cabina}</span>
          <span className={`transform transition-transform duration-300 text-gray-400 ${clickTarifa ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
        {
          clickTarifa && (
            <div className="w-full left-0 top-14 shadow shadow-black/25 bg-white z-10 absolute flex flex-col justify-start gap-y-3 pl-2">
              {tarifas.map((t, k) => <button onClick={()=> handlerSelectTarifa(t)} disabled={cabina === t} key={k} className={`w-full text-start ${cabina == t ? "text-gray-300":"text-[#666]"}`}>{t}</button>)}
            </div>
          )
        }

      </div>
    </div>
  )
}

const OrigenDestino = () => {
  const dispatch = useDispatch();
  const { origin, destino } = useSelector(state => state.homeReducer);
  
  const [inputsInfo, setInputsinfo] = useState({
    origen: origin || "",
    destino: destino || ""
  });

  const [arrayOrigen, setArrayOrigen] = useState([]);
  const [arrayDestino, setArrayDestino] = useState([]);

  const [modalOrigen, setModalOrigen] = useState(false);
  const [modalDestino, setModalDestino] = useState(false);

  const origenRef = useRef(null);
  const destinoRef = useRef(null);

  const bloquearBusquedaOrigen = useRef(false);
  const bloquearBusquedaDestino = useRef(false);

  const handlerInputs = (e) => {
    setInputsinfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlerSelectionOrigen = (value) => {
    dispatch(changeOrigin({ origin: value.city, code: value.code }));
    setInputsinfo(prev => ({ ...prev, origen: value.city }));
    setArrayOrigen([]);
    setModalOrigen(false);
    bloquearBusquedaOrigen.current = true;
  };

  const handlerSelectionDestino = (value) => {
    dispatch(changeDestino({ destination: value.city, code: value.code }));
    setInputsinfo(prev => ({ ...prev, destino: value.city }));
    setArrayDestino([]);
    setModalDestino(false);
    bloquearBusquedaDestino.current = true;
  };

  useEffect(() => {
    if (bloquearBusquedaOrigen.current) {
      bloquearBusquedaOrigen.current = false;
      return;
    }

    if (inputsInfo.origen.length > 2 && inputsInfo.origen.trim() !== "" && inputsInfo.origen !== origin) {
      obtenerDestino(inputsInfo.origen, setArrayOrigen);
      setModalOrigen(true);
    } else {
      setModalOrigen(false);
    }
  }, [inputsInfo.origen, origin]);

  useEffect(() => {
    if (bloquearBusquedaDestino.current) {
      bloquearBusquedaDestino.current = false;
      return;
    }

    if (inputsInfo.destino.length > 2 && inputsInfo.destino.trim() !== "" && inputsInfo.destino !== destino) {
      obtenerDestino(inputsInfo.destino, setArrayDestino);
      setModalDestino(true);
    } else {
      setModalDestino(false);
    }
  }, [inputsInfo.destino, destino]);

  useEffect(() => {
    const handlerClickOutside = (e) => {
      if (origenRef.current && !origenRef.current.contains(e.target)) {
        setModalOrigen(false);
      }
      if (destinoRef.current && !destinoRef.current.contains(e.target)) {
        setModalDestino(false);
      }
    };

    document.addEventListener("mousedown", handlerClickOutside);
    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-3.5">

      {/* Origen */}
      <div className="w-full flex flex-col items-center relative" ref={origenRef}>
        <InputModificado
          name="origen"
          label="ORIGEN"
          svg={svgs.lugar}
          handler={handlerInputs}
          value={inputsInfo.origen}
        />
        {modalOrigen && arrayOrigen.length > 0 && (
          <div className="w-[93%] max-h-[150px] absolute bg-white left-4 mt-16 rounded-md shadow-md overflow-y-auto z-20">
            {arrayOrigen.map((a, k) => (
              <button
                onClick={() => handlerSelectionOrigen(a)}
                key={k}
                className="pl-2 py-4 text-start hover:bg-gray-100 w-full"
              >
                {a.city} ({a.code})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Destino */}
      <div className="w-full flex flex-col items-center relative" ref={destinoRef}>
        <InputModificado
          name="destino"
          label="DESTINO"
          svg={svgs.lugar}
          handler={handlerInputs}
          value={inputsInfo.destino}
        />
        {modalDestino && arrayDestino.length > 0 && (
          <div className="w-[93%] max-h-[150px] absolute bg-white left-4 mt-16 rounded-md shadow-md overflow-y-auto z-10">
            {arrayDestino.map((a, k) => (
              <button
                onClick={() => handlerSelectionDestino(a)}
                key={k}
                className="pl-2 py-4 text-start hover:bg-gray-100 w-full"
              >
                {a.city} ({a.code})
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default function Home(){
    const router = useRouter()
    const { img, codeDestino, codeOrigin, fechPartida, fechRegreso } = useSelector(state => state.homeReducer);
    const dispatch = useDispatch()
    const [soloIda, setSoloIda] = useState(false)
    const [pagarAvios, setPagarAvios] = useState(false)

    const hoy = new Date();

    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;

    const handleCheckboxChange = (e) => {
      setSoloIda(e.target.checked);
      !e.target.checked ? dispatch(tipoViaje("idaYVuelta")) : dispatch(tipoViaje("ida"))
    }
    const handleCheckboxPagar = (e) => {
      setPagarAvios(e.target.checked);
    }

    const handlerBuscar = ()=>{
      if (!soloIda) {
        if (codeDestino && codeOrigin && fechPartida && fechRegreso) {
          router.push("/vuelos")
        }
      }else{
        if (codeDestino && codeOrigin && fechPartida) {
          router.push("/vuelos")
        }
      }
    }

    useEffect(() => {
    const obtenerUbicacion = async ()=>{
       const headers = await axios.get('/api/headers')

       const ubi = await axios.post('/api/geoip/country')
       dispatch(setCountryData(ubi.data))
    }
    obtenerUbicacion()
  }, [])
    
    
    return(
    <div className="w-full bg-[#eee] flex flex-col items-center justify-center">
      
      { (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-[93%] flex items-center mt-1.5">
            <span className="text-[#666] mr-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 12L12 3l9 9v8a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8z"/>
              </svg> 
            </span>
            <span className="text-[#666] text-[14px]">
              / Reservar / Buscar / Vuelos
            </span>

          </div>

          <div className="w-full mt-10 flex flex-col items-center justify-center">
            <h3 className="text-[25px] text-[#666]">Buscador de vuelos</h3>
            <div className="w-[93%] flex">
              <button className="w-[50%] py-5 bg-white text-[#333] border-t-2 border-t-[#d7192d]">
                Vuelos
              </button>
              <button className="w-[50%] py-5 bg-[#e6e6e6] text-[#333] ">
                Otros
              </button>
            </div>

            <div className="w-[93%] pt-6 bg-white flex flex-col items-center gap gap-y-4">
              <OrigenDestino/>
              <label className="w-[90%] pb-4 flex items-center border-b-2 border-b-[#e6e6e6] gap gap-x-2 py-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soloIda}
                  onChange={handleCheckboxChange}
                  className="appearance-none w-6 h-6 rounded checked:border-orange-400 border-1 border-[#666] flex items-center justify-center
                checked:before:content-['✓'] checked:before:text-[#d7192d] checked:before:text-sm checked:before:font-bold checked:before:block checked:before:text-center"
                />
                <span className="text-[15px] text-[#666666] font-medium">
                  Solo ida
                </span>
              </label>

              <div className="w-[90%] flex flex-col gap gap-y-2 border-b-2 justify-center border-b-[#e6e6e6]">
                <span className="text-[#666666] text-[14px]">Fecha del Vuelo</span>
                <span className="text-[#666666] text-[14px] font-semibold"><strong>Hoy: </strong>{fechaFormateada}</span>
                <DateRangeSelector soloIda={soloIda}/>
              </div>
              <Pasajeros/>
              <Tarifa/>

              <label className="w-[90%] pb-4 flex items-center border-b-2 border-b-[#e6e6e6] gap gap-x-2 py-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pagarAvios}
                  onChange={handleCheckboxPagar}
                  className="appearance-none w-5 h-5 rounded checked:border-orange-400 border-1 border-[#666] flex items-center justify-center
                checked:before:content-['✓'] checked:before:text-[#d7192d] checked:before:text-sm checked:before:font-bold checked:before:block checked:before:text-center"
                />
                <span className="text-[13px] text-[#666666] font-medium">
                  Pagar con Avios
                </span>
              </label>

              <button onClick={()=> handlerBuscar()} className="w-[90%] py-3 bg-[#D7192D] text-[13px] text-white">Buscar</button>

              <div className="w-[90%] pb-7 flex items-center gap gap-y-3">
                <img src="./assets/icons/garantia.png" className="w-9 h-9 object-contain" alt="" />
                <span className="text-[#333] text-[13px] font-medium">Garantía mejor precio online</span>
              </div>


            </div>

            <div className="mt-4 w-full flex flex-col gap gap-y-4">
              <div className="w-full bg-[#D7192D]">
                <img src="./assets/image/hotel.jpg" className="w-full h-[150px] object-cover" alt="" />
                <div className="flex flex-col items-center gap gap-y-5">
                  <h3 className="text-[32px] text-white w-[90%]">Hoteles</h3>
                  <span className="text-[14px] font-medium text-white w-[90%]">Cancelación gratuita. Igualamos el precio y suma Avios.</span>
                  <span className="text-[14px] font-medium text-[#fcd100] w-[90%] underline pb-10">Consulta los hoteles</span>
                </div>
              </div>

              <div className="w-full bg-[#D7192D]">
                <img src="./assets/image/coche.jpg" className="w-full h-[150px] object-cover" alt="" />
                <div className="flex flex-col items-center gap gap-y-5">
                  <h3 className="text-[32px] text-white w-[90%]">Coches</h3>
                  <span className="text-[14px] font-medium text-white w-[90%]">Paga en destino. Suma Avios.</span>
                  <span className="text-[14px] font-medium text-[#fcd100] w-[90%] underline pb-10">Alquiler de coches</span>
                </div>
              </div>

              <div className="w-full bg-[#D7192D]">
                <img src="./assets/image/ofertas.jpg" className="w-full h-[150px] object-cover" alt="" />
                <div className="flex flex-col items-center gap gap-y-5">
                  <h3 className="text-[32px] text-white w-[90%]">Ofertas Iberia</h3>
                  <span className="text-[14px] font-medium text-white w-[90%]">Encuentra los mejores precios para tu vuelo con nuestras ofertas.</span>
                  <span className="text-[14px] font-medium text-[#fcd100] w-[90%] underline pb-10">Ver ofertas</span>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-3.5">
              <img src={img ? img : ""} className="w-[99%]" alt="" />

            </div>
            {/* <div className="w-full bg-white flex flex-col items-center mt-4 pb-4">
              <h3 className="text-center text-[1.25rem] pt-2.5">¿Cómo Utilizar Nuestro Buscador de Vuelos?</h3>
              <span className="w-[90%] text-[13px] text-[#333] mt-12"> 
                <strong>Encuentra vuelos al mejor precio </strong>
                de manera fácil y rápida con nuestro buscador de vuelos. Aprovecha todas las opciones que ofrecemos para que tu búsqueda se adapte a lo que necesitas. Por ello, te explicamos en 3 sencillos pasos cómo encontrar el vuelo perfecto a través del buscador.  
              </span>

              <span className="w-[90%] text-[13px] text-[#333] mt-12"> 
                <strong>Paso 1: Introduce los Detalles del Vuelo </strong>
                Escribe la ciudad o el aeropuerto desde donde vas a partir y tu destino en los campos correspondiente. Selecciona si tu viaje será solo de ida, ida y vuelta, o con múltiples destinos utilizando las opciones disponibles. <br/>
                Escoge las fechas en las que planeas viajar utilizando el calendario facilitado para ello y, por último, indica si prefieres la tarifa más económica, tarifas flexibles, o cabinas premium.  
              </span>

              <span className="w-[90%] text-[13px] mt-12 text-[#333]"> 
                <strong>Paso 2: Compara las Opciones Disponibles </strong>
                Una vez que hayas ingresado los detalles de tu vuelo y presionado el botón "Buscar", el sistema comenzará a buscar vuelos entre una amplia gama de ofertas.
              </span>

              <span className="w-[90%] text-[13px] mt-12 text-[#333]"> 
                <strong>Paso 3: Selecciona y Reserva </strong><br/>
                Cuando encuentres el vuelo que se ajuste perfectamente a lo que buscas, haz clic en la opción que te interese. A continuación, sigue estos pasos para completar la reserva:
              </span>
              <ul className="w-[80%] mt-4 gap gap-y-4 list-disc">
                <li className="pl-8">
                  <span className="w-[90%] text-[13px] mt-12 text-[#333]"> 
                    <strong>Revisa los Detalles</strong>
                    : Verifica toda la información del vuelo, incluyendo horarios, precios y cualquier otra opción adicional que puedas haber seleccionado, como el equipaje o la selección de asientos.
                  </span>
                </li>
                <li className="pl-8">
                  <span className="w-[90%] text-[13px] mt-12 text-[#333]"> 
                    <strong>Completa la reserva</strong>
                    : Elige tu método de pago y proporciona la información requerida para finalizar la compra.
                  </span>
                </li>
                <li className="pl-8">
                  <span className="w-[90%] text-[13px] mt-12 text-[#333]"> 
                    <strong>Confirma y Recibe tu billete</strong>
                    : Revisa todos los detalles y realiza el pago. A continuación, recibirás al correo la confirmación y los detalles de tu vuelo.
                  </span>
                </li>
              </ul>
              <span className="w-[90%] text-[13px] mt-12 text-[#333]"> 
                Con nuestro buscador de vuelos, puedes estar seguro de que estás accediendo a las mejores ofertas y precios disponibles 
                <strong>¡Empieza a planificar tu viaje hoy mismo! </strong>
              </span>
            </div> */}
          </div>

        </div>
      )}
    
    </div>
    )
}