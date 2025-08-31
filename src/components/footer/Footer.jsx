
export default function Footer(){
    return(
        <div className="w-full flex flex-col items-center justify-center bg-[#f3f2f6] pt-5">
            <div className="w-full flex justify-center items-center mb-3">
                <div className="w-[90%] flex flex-col justify-center items-center gap gap-y-3.5">
                    <div className="w-full grid grid-cols-7 items-center justify-center gap gap-x-3">
                        <img src="/assets/icons/AX.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/BIZUM.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/CA.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/DC.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/AXi.svg" className="w-full object-contain h-4" alt="" />
                        <img src="/assets/icons/TP.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/UP.svg" className="w-full object-cover" alt="" />
                    </div>
                    <div className="w-[38%] flex items-center justify-center gap gap-x-3">
                        <img src="/assets/icons/VIs.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/PAYPAL.svg" className="w-full object-cover" alt="" />
                        <img src="/assets/icons/CAd.svg" className="w-full object-cover" alt="" />
                    </div>
                </div>
            </div>
            <div className="w-full bg-white flex justify-center items-center mt-2">
                <p className="font-[iberiaheadline] text-[14px] font-semibold text-[#777] py-4">© Iberia {new Date().getFullYear()}</p>
            </div>
        </div>
    )
} 