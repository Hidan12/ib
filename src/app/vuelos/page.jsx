"use client"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import CardVuelo from "@/components/cardVuelo/CardVuelo";
import { Loading } from "@/components/loading/Loading";
import { fechaPartida, fechaRegreso, setPrecio } from "@/redux/slices/homeSlice";
import { useEffect, useState } from "react";
import CarruselFechas from "@/components/carruselFecha/CarruselFecha";


const ComponNoVuelos = ({ openModal }) => {
  return (
    <div className="w-full bg-white h-[75vh] flex flex-col gap-x-5 justify-around items-center">
      <p className="w-[90%] text-[20px] text-black font-semibold">
        No se encontraron vuelos en la fecha seleccionada
      </p>
      <button
        onClick={() => openModal(true)}
        className="text-white bg-black w-[90%] rounded-2xl py-3"
      >
        Cambiar fecha
      </button>
    </div>
  );
};

const travel = {
  Economy: "ECONOMY",
  "Premium Economy": "PREMIUM_ECONOMY",
  "Premium Business": "BUSINESS",
};

const formatFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
    const [day, month, year] = dateString.split("/");
    if (day && month && year) {
      const formattedDay = day.padStart(2, "0");
      const formattedMonth = month.padStart(2, "0");
      return `${year}-${formattedMonth}-${formattedDay}`;
    }
    return(dateString)
}

const dividirVuelos = (vuelos, setObjectVuelos) => {
  const resultado = {};

  vuelos.forEach((element) => {
    const fecha = formatFecha(element.horarios.salida);
    const tipo = element.tipo_vuelo; // "ida" o "vuelta"

    if (!resultado[fecha]) {
      resultado[fecha] = {};
    }
    if (!resultado[fecha][tipo]) {
      resultado[fecha][tipo] = [];
    }
    resultado[fecha][tipo].push(element);
  });

  
  setObjectVuelos(resultado);
};


export default function Vuelos (){
  const dispatch = useDispatch();
  const router = useRouter()
  const { cantPasajeros, codeOrigin, cambioFecha, codeDestino, tipViaje, fechPartida, fechRegreso, cabina, precio, copiaPrecio } = useSelector(state => state.homeReducer);
  const { money, country } = useSelector(state => state.country);
  const [loadCambio, setLoadCambio] = useState(false)
  const [load, setLoad] = useState(true);
  const [tesVuelo, setTesVuelo] = useState({})
  const [cambiosSelecFecha, setCambioSelecFecha] = useState(null)
  const [viajes, setViajes] = useState([]);
  const [ruta, setRuta] = useState(null)
  const [vuelosVuelta, setVuelosVuelta] = useState()
  const [vueloIdaSeleccionado, setVueloIdaSeleccionado] = useState(null);
  const [vueloVueltaSeleccionado, setVueloVueltaSeleccionado] = useState(null);

  const handlerCompra = () => {
        const total = (vueloIdaSeleccionado.precio.total + (vueloVueltaSeleccionado?.precio?.total || 0)) * cantPasajeros
        dispatch(setPrecio(total));
        router.push("/pasajeros");
  };

  const handlerVueloIda = (info)=>{
    setVueloIdaSeleccionado(info)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (tipViaje == "ida") {
      router.push("/pasajeros")
    }
  }

  const handlerVueloVuelto = (info) =>{
    setVueloVueltaSeleccionado(info)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    router.push("/pasajeros")
  }



  const handlerCambioIdaVuelo = ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setVueloIdaSeleccionado(null)
  }
  const handlerCambioVueltaVuelo = ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setVueloVueltaSeleccionado(null)
  }

    const handlerModificarFecha = (fecha, tipoVuelo) => {
        const fechaObj = new Date(fecha)

        if (tipoVuelo == "ida") {
            setCambioSelecFecha("ida");
            dispatch(fechaPartida(formatDate(fecha)));

            if (tipViaje === "idaYVuelta" && fechaObj > new Date(fechRegreso)) {
                const siguienteDia = new Date(fechaObj);
                siguienteDia.setDate(siguienteDia.getDate() + 1);
                dispatch(fechaRegreso(formatFecha(siguienteDia)));
            }
        } else {
            setCambioSelecFecha("vuelta");
            dispatch(fechaRegreso(fecha));
        }
    };


  useEffect(() => {
    const consulta = async (body) => {
        const info = await axios.post("/api/vuelos", body, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        dividirVuelos(info.data.data, setTesVuelo)
        
        setRuta(info.data.ruta)
        setVuelosVuelta( v => v = info.data.data.filter(v => v.tipo_vuelo === 'vuelta'))
        setViajes(info.data.data);
        setLoad(false);
    };
    if (codeOrigin && codeDestino && tipViaje && fechPartida) {
      const data = {
        origin: codeOrigin,
        destination: codeDestino,
        departure_date: formatDate(fechPartida),
        adults: cantPasajeros,
        country: country,
        max_results: 5,
      };
      tipViaje == "idaYVuelta" ? data.return_date = formatDate(fechRegreso) : "";
        
      if (cambiosSelecFecha) {
        if (cambiosSelecFecha == "ida" && !tesVuelo?.[fechPartida]?.ida) {
            setLoad(true)
            consulta(data)
        }
        if (cambiosSelecFecha == "vuelta" && !tesVuelo?.[fechRegreso]?.vuelta) {
            setLoad(true)
            consulta(data)
        }      
      }else{
          consulta(data);
      }
    } else {
      router.push("/");
    }
  }, [cambioFecha]);
  
  const vuelosIda = viajes.filter(v => v.tipo_vuelo === 'ida');
  
  return (
    <div className="w-full flex flex-col items-center gap-y-4">
      {load ? 
        <Loading/> :
        <div className="w-full bg-[#f3f2f6] flex flex-col items-center gap-y-4">
          {!vueloIdaSeleccionado && (
        <div className="w-[90%] flex flex-col gap gap-y-4">
          <div className="flex justify-center mt-2.5">
            <div className="text-[#777777] rotate-90 mr-3 mt-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16">
                <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"/>
              </svg>
            </div>
            <h2 className="text-[15px] font-medium mt-2 text-center text-[#777777]">Selecciona un vuelo de ida</h2>
          </div>
          <div className="flex justify-center items-center mt-1">
            <div className="w-[96%]">
                <CarruselFechas fechaInicioViaje={formatDate(fechPartida)} handler={handlerModificarFecha}/>
            </div>
          </div>
          {tesVuelo?.[formatDate(fechPartida)]?.ida?.map((v, k) => (
            <CardVuelo key={k} vuelo={v} pos={k} setVueloSeleccionado={handlerVueloIda}/>
          ))}
          {vuelosIda.length == 0 && !loadCambio && (
            <div className="w-full flex flex-col mb-10">
              <span className="font-semibold text-[16px] my-3">
                No se encontraron vuelos de ida.
              </span>
            </div>
          )}
        </div>
      )}

      {vueloIdaSeleccionado && (
        <div className="w-[90%] flex flex-col gap-y-6">
          {tipViaje === "idaYVuelta" && !vueloVueltaSeleccionado && (
            <div>
              <div className="flex justify-center mt-2.5">
                <div className="text-[#777777] rotate-90 mr-3 mt-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16">
                    <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"/>
                  </svg>
                </div>
                <h2 className="text-[15px] font-medium mt-2 text-center text-[#777777]">Selecciona un vuelo de vuelta</h2>
              </div>
              <div className="w-[92%] mt-2.5 mb-3">
                <CarruselFechas fechaInicioViaje={formatDate(fechPartida)} fechaFinViaje={formatDate(fechRegreso)} handler={handlerModificarFecha}/>
              </div>
              {tesVuelo?.[formatDate(fechRegreso)]?.vuelta?.map((v, k) => (
                <CardVuelo key={k} vuelo={v} pos={k} label={"Vuelta"} setVueloSeleccionado={handlerVueloVuelto}/>
              ))}
              {vuelosVuelta?.length == 0 && !loadCambio && (
                <div className="w-full flex flex-col mb-10">
                  <span className="font-semibold text-[16px] my-3">
                    No se encontraron vuelos de regreso.
                  </span>
                </div>
              )}
            </div>
          )}

          
        </div>
      )}

        </div>  
    }
    </div>
  );
};


