import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const CarruselFechas = ({ fechaInicioViaje, handler, fechaFinViaje = null }) => {
  const [fechas, setFechas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechaRegreso, setFechaRegreso] = useState(null);

  const swiperRef = useRef(null);

  const parseFecha = (fechaStr) => {
    const [y, m, d] = fechaStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const formatoFecha = (fecha) =>
    fecha.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });

  const esSeleccionada = (fecha) => fecha.toDateString() === fechaSeleccionada;
  const esFechaRegreso = (fecha) => fecha.toDateString() === parseFecha(fechaInicioViaje).toDateString();

  useEffect(() => {
    const fechaInicio = parseFecha(fechaInicioViaje);
    const hoy = new Date();

    if (fechaFinViaje) {
      const regreso = parseFecha(fechaFinViaje);
      setFechaRegreso(regreso.toDateString());
      setFechaSeleccionada(regreso.toDateString());
    } else {
      setFechaSeleccionada(fechaInicio.toDateString());
    }

    // Generar fechas para el carrusel (125 días)
    const nuevasFechas = [];
    for (let i = 0; i <= 125; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      nuevasFechas.push(fecha);
    }

    setFechas(nuevasFechas);
  }, [fechaInicioViaje, fechaFinViaje]);

  useEffect(() => {
    if (swiperRef.current && fechas.length > 0) {
      const index = fechas.findIndex(
        (f) => f.toDateString() === fechaSeleccionada
      );
      if (index !== -1) {
        swiperRef.current.slideTo(index, 0);
      }
    }
  }, [fechas, fechaSeleccionada]);

  const handlerFechaSelec = (fecha)=>{
    console.log(fecha);
    
    setFechaSeleccionada(fecha.toDateString())
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0'); // los meses van de 0 a 11
    const dd = String(fecha.getDate()).padStart(2, '0');
    const fechaFormat = `${yyyy}-${mm}-${dd}`
    handler(fechaFormat, fechaFinViaje ? "idaYVuelta":"ida")
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={3}
        spaceBetween={4}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation]}
      >
        {fechas.map((fecha, index) => (
          <SwiperSlide className="w-[34%]" key={index}>
            <div
              onClick={
                fechaFinViaje && esFechaRegreso(fecha)
                  ? undefined
                  : () =>handlerFechaSelec(fecha) 
              }
              className={`text-center transition-colors duration-200 w-full py-3 ${
                esSeleccionada(fecha)
                  ? "bg-[#d7192d] text-white text-[14px] font-medium"
                  : "bg-white text-gray-600 text-[14px]"
              } ${
                fechaFinViaje && esFechaRegreso(fecha)
                  ? "pointer-events-none opacity-50 cursor-not-allowed bg-[#d7192d]"
                  : "cursor-pointer"
              }`}
            >
              {formatoFecha(fecha)}
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselFechas;
