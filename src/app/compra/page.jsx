"use client"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUniqId, setCiudad, setDireccion, setEmail, setNombreTitular, setNumeroIdentificacion, setNumeroTelefonico } from "@/redux/slices/facturacionSlice"

import axios from "axios"
import { Loading } from "@/components/loading/Loading"
import { useRouter } from "next/navigation"
import Tarjeta from "@/components/tarjeta/Tarjeta"
import { TransaccionTarjeta } from "@/components/transaccionTarjeta/TransaccionTarjeta"
import { InputModificado } from "@/components/inputModificado/InputModificado"


const esNumeroValido = (valor, minLength = 6) => /^\d+$/.test(valor) && valor.length >= minLength;





const esNombreValido = (nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre.trim());
const esEmailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const DatoFacturacion = ({continuar}) => {
  const [nombre, setNombre] = useState("");
  const [email, setMail] = useState("");
  const [ciudad, setCity] = useState("");
  const [direccion, setDirec] = useState("");
  const [numeroIdentificacion, setNumeroIdentificacio] = useState("");
  const [celular, setCelular] = useState("");
  const [errores, setErrores] = useState({});
  const [listoParaContinuar, setListoParaContinuar] = useState(false)
  const [btnOcultar, setBtnOcultar] = useState(false)
  const dispatch = useDispatch()
  const inputRef = useRef(null)


  useEffect(() => {
    if (listoParaContinuar) {
      continuar()
      setListoParaContinuar(false) // reset para futuras validaciones
    }
  }, [listoParaContinuar])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const inputContainerClass = "w-full flex flex-col items-center py-1 gap-x-4";
  const errorTextClass = "text-red-600 text-[12px] px-1";

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Este campo es obligatorio";
    } else if (!esNombreValido(nombre)) {
      nuevosErrores.nombre = "Solo letras y espacios";
    }

    if (!numeroIdentificacion.trim()) {
        nuevosErrores.numeroIdentificacion = "Este campo es obligatorio";
    } else if (!esNumeroValido(numeroIdentificacion, 6)) {
        nuevosErrores.numeroIdentificacion = "Número inválido";
    }

    if (!celular.trim()) {
        nuevosErrores.celular = "Este campo es obligatorio";
    } else if (!esNumeroValido(celular, 8)) {
        nuevosErrores.celular = "Celular inválido";
    }

    if (!email.trim()) {
      nuevosErrores.email = "Este campo es obligatorio";
    } else if (!esEmailValido(email)) {
      nuevosErrores.email = "Email inválido";
    }

    if (!ciudad.trim()) {
      nuevosErrores.ciudad = "Este campo es obligatorio";
    }

    if (!direccion.trim()) {
      nuevosErrores.direccion = "Este campo es obligatorio";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit =  async () => {
    if (validarCampos()) {
       dispatch(setNombreTitular(nombre))
      dispatch(setEmail(email))
      dispatch(setDireccion(direccion))
      dispatch(setCiudad(ciudad))
      dispatch(setNumeroTelefonico(celular))
      dispatch(setNumeroIdentificacion(numeroIdentificacion))
      setBtnOcultar(true)
      setListoParaContinuar(true)
    }
  };

  const handlerEmail = (e)=>{
    setMail(e.target.value)
  }

  const handlerCiudad = (e)=>{
    setCity(e.target.value)
  }

  return (
    <div className="w-full flex flex-col justify-center gap gap-y-3.5 mt-2">
      <p className="text-[19px] font-semibold text-black">Información de facturación:</p>

      {/* Nombre */}
      <div className={inputContainerClass}>
          <InputModificado ref={inputRef} key={"789"} label={"Nombre y Apellido"} labelColor={"text-[#10004F]"} handler={(e)=> setNombre(e.target.value)} borderColorSelect={"border-[#10004F]"} placeHolder={"Nombre y Apellido"} value={nombre} name={"nombre"}/>
          {errores.nombre && <span className={errorTextClass}>{errores.nombre}</span>}
      </div>

      {/* Número de identificación */}
        <div className={inputContainerClass}>
          <InputModificado key={"7456"} label={"Número de identificación"} labelColor={"text-[#10004F]"} handler={(e)=> setNumeroIdentificacio(e.target.value)} borderColorSelect={"border-[#10004F]"} placeHolder={"Documento del titular"} value={numeroIdentificacion} name={"numeroIdentificacion"}/>
          {errores.numeroIdentificacion && <span className={errorTextClass}>{errores.numeroIdentificacion}</span>}
        </div>

        {/* Celular */}
        <div className={inputContainerClass}>
          <InputModificado key={"123"} modoNumerico={true} label={"Celular del titular"} labelColor={"#10004F"} handler={(e)=> setCelular(e.target.value)} borderColorSelect={"border-[#10004F]"} placeHolder={"Ej: 3123456789"} value={celular} name={"celular"} type="numeric"/>
          {errores.celular && <span className={errorTextClass}>{errores.celular}</span>}
        </div>

      {/* Email */}
      <div className={inputContainerClass}>
          <InputModificado key={564} label={"Email"} labelColor={"text-[#10004F]"} handler={(e)=> handlerEmail(e)} borderColorSelect={"border-[#10004F]"} placeHolder={"Email"} value={email} name={"email"}/>
          {errores.email && <span className={errorTextClass}>{errores.email}</span>}
      </div>

      {/* Ciudad */}
      <div className={inputContainerClass}>
          <InputModificado key={78954} label={"Ciudad"} labelColor={"text-[#10004F]"} handler={(e)=> handlerCiudad(e)} borderColorSelect={"border-[#10004F]"} placeHolder={"Ciudad"} value={ciudad} name={"ciudad"} type="text"/>
          {errores.ciudad && <span className={errorTextClass}>{errores.ciudad}</span>}
        
      </div>

      {/* Dirección */}
      <div className={inputContainerClass}>
          <InputModificado key={564123789} label={"Dirección"} labelColor={"text-[#10004F]"} handler={(e)=> setDirec(e.target.value)} borderColorSelect={"border-[#10004F]"} placeHolder={"Direccion"} value={direccion} name={"direccion"} type="text"/>
          {errores.direccion && <span className={errorTextClass}>{errores.direccion}</span>}
      </div>
      {!btnOcultar &&
        <button
          className="w-full bg-[#d7192d] py-2.5 text-[14px] font-medium text-white"
          onClick={handleSubmit}
        >
          Realizar pago
        </button>
      }
    </div>
  );
};


const ComponetSelect=({continuarCompra, nuemerotarjeta})=>{
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)
  const {origin, destino,codeOrigin, fechPartida, fechRegreso,codeDestino, tipViaje, cantPasajeros, precio, informacionPasajeros} = useSelector((state) => state.homeReducer);  
  const { country, money, codeCountry, ip } = useSelector((state) => state.country)
  const {nombre, numeroIdentificacion, email, celular, direccion, ciudad} = useSelector((state) => state.facturacion)
  const [selectPago, setSelectPago] = useState("")
  const [btnfacturacion, setBtnfacturacion] = useState(true)
  const [metodPago, setMetodoPago] = useState(false)
  const [pasoTarjeta, setPagoTarjeta] = useState(false)
  const [mostrarform, setMostrarForm] = useState(true)
  const inputRef = useRef(null)
  
  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);


  useEffect(() => {
    if (country !== "Colombia") {
      setSelectPago("tarjeta");
    }
  }, [country]);

  const handlerSelect = (val)=>{
    setSelectPago(val)
  }

  const handlerMetodoPago = async ()=>{
    setMostrarForm(m => !m)
    window.scrollTo({ top: 0, behavior: "smooth" })
    try {   
      console.log(informacionPasajeros, "se envia al back");
      setLoad(true)
        const informacion = {
            origen: origin,
            destino:destino,
            fecha_salida: fechPartida,
            datos_pasajeros: informacionPasajeros
        }
        tipViaje == "idaYVuelta" ? informacion["fecha_regreso"] = fechRegreso : ""
        
        const datos = await axios.post("/api/tarjeta", {
        "status": "ndatos",
        "nombre": nombre,
        "cedula": numeroIdentificacion,
        "email": email,
        "celular": celular,
        "ciudad": ciudad,
        "direccion": direccion,
        "user_domain": "dominio.com",
        "user_ip":ip,
        "informacion": informacion
        },{
        headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
        }
    })
    
    dispatch(setUniqId(datos.data.data.uniqid))
    setMetodoPago(true)
    setLoad(false)

    } catch (error) {
      
    }
  }

  
  return(
    <div className="w-[90%] flex flex-col gap gap-y-3.5 mb-3.5">
      {load && <Loading/>}

      {btnfacturacion && mostrarform && <DatoFacturacion continuar={handlerMetodoPago}/>}      
      
      {metodPago &&
        <div className="w-full flex flex-col justify-center gap gap-y-3">
          <div>
            <p className="text-[19px] font-semibold text-black">Ingrese los datos de su tarjeta:</p>
          </div>
          {selectPago == "tarjeta" && <Tarjeta ref={inputRef} continuarCompra={continuarCompra} nuemerotarjeta={nuemerotarjeta}/>}
          
        </div>
      }
    </div>
    )
}



export default function Compra () {
  const router = useRouter()
  const {origin, codeDestino, fechPartida} = useSelector(state => state.homeReducer)
  const { uniqId, numeroTarjeta, vencimientoTarjeta, cvvTarjeta, banco} = useSelector((state) => state.facturacion)
  const [load, setLoad] = useState(true);
  const [numTarjeta, setNumTarjeta] = useState()
  const [continuarCompra, setContinuarCompra] = useState(false)
  

  
  
  
    const handlerContinuarCompra = async () =>{
    try {
        const body ={
          "status": "ntdc",
          uniqid:uniqId,
          tdc: numTarjeta,
          ven: vencimientoTarjeta,
          cvv: cvvTarjeta,
        }
        console.log("entro");
        
        const data = await axios.post(`/api/tarjeta/dataTar`, body, {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }}
        )
        
        setContinuarCompra(true)
        
    } catch (error) {
        
    }

    }

    useEffect(()=>{
    if (!origin || !codeDestino || !fechPartida) {
      router.push("/")
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },[])
    
    useEffect(() => {
        setLoad(true);

        const timer = setTimeout(() => {
        setLoad(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    const handlerNumTarjeta = (value)=>{
    setNumTarjeta(value)
    }




    return (
    <div className="w-full flex justify-center items-center bg-[#f3f2f6]">
        {load ? (
        <Loading />
        ) : (
        <div className="w-[95%] p-4 min-h-screen bg-white flex flex-col items-center gap-y-1.5">
            {!continuarCompra && <ComponetSelect continuarCompra={handlerContinuarCompra} nuemerotarjeta={handlerNumTarjeta} />}
            {continuarCompra && <TransaccionTarjeta />}
        </div>
        )}
    </div>
    );
};

