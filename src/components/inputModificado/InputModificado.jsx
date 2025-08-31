import { forwardRef, useState } from "react"

const InputModificado = forwardRef (({label, handler, value, name, svg, modoNumerico, type="text"}, ref)=>{
    const [isFocused, setIsFocused] = useState(false);
    
    return(
        <div className={`w-[90%] border border-[#e6e6e6] flex items-center relative pt-6 pb-3 pl-4 pr-4 transition-all duration-300 text-[#666] ${isFocused ? "border-orange-400":""}`}>
            <input ref={ref} type={type} autoComplete="off" inputMode={`${modoNumerico ? "numeric": undefined}`}  pattern={modoNumerico ? "[0-9]*" : undefined}  name={name} value={value} onChange={(e)=>handler(e)} className="outline-none w-full font-medium text-[14px] z-10" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
            <span className={`absolute transition-all duration-300 left-2 pointer-events-none font-medium  ${isFocused ? "top-1 pl-1 text-[11px]" : value == "" ? " text-[12px] text-center top-5": "top-1 pl-1 text-[11px]"}`}>{label}</span>
            {svg && svg}
        </div>
    )
})

export {InputModificado}