import { useState, useRef, useEffect } from "react";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./fecha.css";
import { useDispatch } from "react-redux";
import { fechaPartida, fechaRegreso } from "@/redux/slices/homeSlice";

export default function DateRangeSelector({ soloIda }) {
  const [ida, setIda] = useState(null);
  const [vuelta, setVuelta] = useState(null);
  const [open, setOpen] = useState(null);
  const [monthIda, setMonthIda] = useState(new Date());     
  const [monthVuelta, setMonthVuelta] = useState(new Date()); 

  const dispatch = useDispatch();
  const idaRef = useRef(null);
  const vueltaRef = useRef(null);

  const formatFecha = (fecha) =>
    fecha ? fecha.toLocaleDateString("es-ES").padStart(9, "0") : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open === "ida" && idaRef.current && !idaRef.current.contains(event.target)) {
        setOpen(null);
      }
      if (open === "vuelta" && vueltaRef.current && !vueltaRef.current.contains(event.target)) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (date) => {
    if (open === "ida") {
      dispatch(fechaPartida(formatFecha(date)));
      setIda(date);
    }
    if (open === "vuelta") {
      dispatch(fechaRegreso(formatFecha(date.to)));
      setVuelta(date.to);
    }
    setOpen(null);
  };

  const handlerVuelta = () => {
    if (!ida) {
      setOpen("ida");
    } else {
      setOpen("vuelta");
    }
  };

  return (
    <div className="bg-white relative w-full">
      <div className="mb-4 space-y-4">
        {/* Fecha Ida */}
        <div className="border border-[#e6e6e6] flex items-center relative pt-6 pb-3 pl-4 pr-4 transition-all duration-300 text-[#666]">
          <input
            className={`outline-none w-full font-medium text-[15px] z-10 ${
              open == "ida" ? "bg-pink-100" : ""
            }`}
            onFocus={() => setOpen("ida")}
            value={ida ? formatFecha(ida) : ""}
            readOnly
            placeholder={open == "ida" ? "DD-MM-YYYY" : ""}
          />
          <label
            className={`absolute transition-all duration-300 left-2 pointer-events-none font-medium ${
              open == "ida"
                ? "top-1 pl-1 text-[11px]"
                : !ida
                ? " text-[13px] text-center"
                : "top-1 pl-1 text-[11px]"
            }`}
          >
            FECHA IDA
          </label>
        </div>

        {open == "ida" && (
          <div ref={idaRef} className="w-full top-16 bg-[#eee] z-20 absolute">
            <label className="pl-3 pb-4 flex items-center border-b-1 border-b-[#666666] gap gap-x-2 py-3 cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 rounded checked:border-orange-400 border-1 border-[#666] flex items-center justify-center checked:before:content-['✓'] checked:before:text-[#d7192d] checked:before:text-sm checked:before:font-bold checked:before:block checked:before:text-center"
              />
              <span className="text-[13px] text-[#666666] font-medium">
                Mis fechas son flexibles
              </span>
            </label>
            <DayPicker
              mode="single"
              selected={ida}
              onSelect={(e) => handleSelect(e)}
              disabled={{ before: new Date() }}
              className="w-full flex items-center justify-center rdp"
              classNames={{
                caption: "flex justify-between items-center px-4 mb-2",
                caption_label:
                  " relative left-[30%] text-[15px] top-1 font-semibold capitalize",
                nav: "flex items-center w-full items-center justify-between absolute",
                nav_button: "text-red-600",
                day: "!w-[5px] !h-[4px] text-[12px] p-0",
                selected: "bg-red-600 !p-0 text-white",
                today: "font-bold underline",
              }}
              month={monthIda}
              locale={{
                ...es,
                localize: {
                  ...es.localize,
                  day: (n) => ["d", "l", "m", "x", "j", "v", "s"][n] // sobrescribimos
                }
              }}           
              onMonthChange={setMonthIda}   
            />
          </div>
        )}

        {!soloIda && (
          <div className="relative">
            <div className="border border-[#e6e6e6] flex items-center relative pt-6 pb-3 pl-4 pr-4 transition-all duration-300 text-[#666]">
              <input
                className={`outline-none w-full font-medium text-[15px] z-10 ${
                  open == "vuelta" ? "bg-pink-100" : ""
                }`}
                onFocus={handlerVuelta}
                value={vuelta ? formatFecha(vuelta) : ""}
                readOnly
                placeholder={open == "vuelta" ? "DD-MM-YYYY" : ""}
              />
              <label
                className={`absolute transition-all duration-300 left-2 pointer-events-none font-medium ${
                  open == "vuelta"
                    ? "top-1 pl-1 text-[11px]"
                    : !vuelta
                    ? " text-[13px] text-center"
                    : "top-1 pl-1 text-[11px]"
                }`}
              >
                FECHA VUELTA
              </label>
            </div>

            {open == "vuelta" && (
              <div ref={vueltaRef} className="w-full top-16 bg-[#eee] z-20 absolute">
                <label className="pl-3 pb-4 flex items-center border-b-1 border-b-[#666666] gap gap-x-2 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 rounded checked:border-orange-400 border-1 border-[#666] flex items-center justify-center checked:before:content-['✓'] checked:before:text-[#d7192d] checked:before:text-sm checked:before:font-bold checked:before:block checked:before:text-center"
                  />
                  <span className="text-[13px] text-[#666666] font-medium">
                    Mis fechas son flexibles
                  </span>
                </label>
                <DayPicker
                  mode="range"
                  selected={{ from: ida, to: vuelta }}
                  onSelect={handleSelect}
                  disabled={{ before: ida || new Date() }}
                  className="w-full flex items-center justify-center rdp"
                  classNames={{
                    caption: "flex justify-between items-center px-4 mb-2",
                    caption_label:
                      " relative left-[30%] text-[15px] top-1 font-semibold capitalize",
                    nav: "flex items-center w-full items-center justify-between absolute",
                    nav_button: "text-red-600",
                    day: "w-[5px] h-[5px] font-bold text-[12px] p-0",
                    selected: "bg-red-600 p-0 text-white rounded-lg",
                    today: "font-bold underline",
                    range_start: "bg-red-400 text-white rounded-l-lg",
                    range_middle: "bg-pink-300 text-white",
                    range_end: "bg-red-400 text-white rounded-r-lg",
                  }}
                  month={monthVuelta}
                  locale={{
                    ...es,
                    localize: {
                      ...es.localize,
                      day: (n) => ["d", "l", "m", "x", "j", "v", "s"][n] // sobrescribimos
                    }
                  }}              
                  onMonthChange={setMonthVuelta}   
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
