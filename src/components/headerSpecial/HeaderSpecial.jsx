import { useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation"

const HeaderSpecial = ()=>{
    const pathname = usePathname()
    console.log(pathname);
    
    const estado= {"/vuelos":1, "/pasajeros": 2, "/compra":3, "/compraExitosa": 5, "/errorCompra": 5}
    const { codeOrigin, codeDestino, tipViaje, precio, copiaPrecio } = useSelector(state => state.homeReducer)
    const { money, codeCountry } = useSelector(state => state.country)

    return(
        <div className="w-full sticky top-0 left-0 flex flex-col justify-center items-center z-30">
            <div className="w-full bg-[#d7192d] flex justify-center items-center">
                <div className="w-[95%] py-2.5 flex justify-between">
                    <div className="flex items-center">
                        <img src="/assets/icons/logo_iberia.svg" className="w-[20%] pr-2 object-cover border-r-2 border-r-[#c0424f]" alt="" />
                        <p className="text-white text-[14px] mr-1 pl-1.5 pr-1.5 border-r-2 border-r-red-300">{codeOrigin} → {codeDestino}</p>
                        <p className="text-white text-[14px]">{estado[pathname]}/5</p>
                    </div>

                    <div className="border-r-[#c0424f] pr-1.5 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                    </div>

                </div>
            </div>
            <div className="w-full bg-[#a8191a] flex justify-center items-center">
                <div className="w-[95%] py-2.5 flex justify-between">
                    <span className="text-[18px] text-white">TOTAL: </span>
                    <span className="text-[18px] text-white font-[iberiaheadline]">{copiaPrecio?.toLocaleString(`es-${codeCountry ? codeCountry : "CO"}`)} {money}</span>
                </div>
            </div>
        </div>
    )
}

export {HeaderSpecial}