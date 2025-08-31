"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function CompraExitosa() {
    const router = useRouter()
    const {codeOrigin, codeDestino, fechPartida} = useSelector((state) => state.homeReducer);  
    

    useEffect(()=>{
    
    if (!codeOrigin || !codeDestino || !fechPartida) {
      router.push("/")
    }
  },[])
  
    useEffect(() => {


        const timeout = setTimeout(() => {
        window.location.href = "https://www.iberia.com/es/buscador-vuelos/"
        }, 5000);

        return () => clearTimeout(timeout); // Limpieza por si se desmonta antes
    }, []);
    return(
        <div className="w-full flex justify-center items-center bg-slate-200">
            <div className="w-[90%] min-h-screen bg-white flex flex-col items-center gap gap-y-5">
                <img src="/assets/image/logo/logo2.png" className="w-[50vw] h-[20vw] object-contain" alt="" />
                <h3 className="text-[20px] font-semibold">¡Pago Exitoso!</h3>
                <span className="w-[90%] text-[15px]">Tu pago ha sido procesado correctamente. Hemos enviado un correo electrónico con los detalles de tu reserva.
            Gracias por volar con Iberia.</span>

                <div className="w-[90%] mt-12">

                </div>
            </div>

        </div>
    )
}

