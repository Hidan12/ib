"use client"
import { InputModificado } from "@/components/inputModificado/InputModificado";
import { setInfoPasajeros } from "@/redux/slices/homeSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const prefijos = [
  { pais: "Canadá / +1", numeroPrefijo: "+1" },
  { pais: "Estados Unidos / +1", numeroPrefijo: "+1" },
  { pais: "Bermudas / +1-441", numeroPrefijo: "+1-441" },
  { pais: "Bahamas / +1-242", numeroPrefijo: "+1-242" },
  { pais: "Barbados / +1-246", numeroPrefijo: "+1-246" },
  { pais: "Anguila / +1-264", numeroPrefijo: "+1-264" },
  { pais: "Antigua y Barbuda / +1-268", numeroPrefijo: "+1-268" },
  { pais: "Islas Vírgenes Británicas / +1-284", numeroPrefijo: "+1-284" },
  { pais: "Islas Caimán / +1-345", numeroPrefijo: "+1-345" },
  { pais: "Granada / +1-473", numeroPrefijo: "+1-473" },
  { pais: "Islas Turcas y Caicos / +1-649", numeroPrefijo: "+1-649" },
  { pais: "Montserrat / +1-664", numeroPrefijo: "+1-664" },
  { pais: "San Martín (parte francesa) / +1-721", numeroPrefijo: "+1-721" },
  { pais: "Santa Lucía / +1-758", numeroPrefijo: "+1-758" },
  { pais: "Dominica / +1-767", numeroPrefijo: "+1-767" },
  { pais: "San Vicente y las Granadinas / +1-784", numeroPrefijo: "+1-784" },
  { pais: "República Dominicana / +1-809", numeroPrefijo: "+1-809" },
  { pais: "República Dominicana (otros códigos) / +1-829", numeroPrefijo: "+1-829" },
  { pais: "República Dominicana (otros códigos) / +1-849", numeroPrefijo: "+1-849" },
  { pais: "Trinidad y Tobago / +1-868", numeroPrefijo: "+1-868" },
  { pais: "San Cristóbal y Nieves / +1-869", numeroPrefijo: "+1-869" },

  { pais: "Groenlandia / +299", numeroPrefijo: "+299" },
  { pais: "San Pedro y Miquelón / +508", numeroPrefijo: "+508" },
  { pais: "México / +52", numeroPrefijo: "+52" },
  { pais: "Haití / +509", numeroPrefijo: "+509" },
  { pais: "Cuba / +53", numeroPrefijo: "+53" },
  { pais: "Guadalupe / +590", numeroPrefijo: "+590" },
  { pais: "Martinica / +596", numeroPrefijo: "+596" },
  { pais: "Curazao, Bonaire, San Eustaquio y Saba / +599", numeroPrefijo: "+599" },
  { pais: "Belice / +501", numeroPrefijo: "+501" },
  { pais: "Guatemala / +502", numeroPrefijo: "+502" },
  { pais: "El Salvador / +503", numeroPrefijo: "+503" },
  { pais: "Honduras / +504", numeroPrefijo: "+504" },
  { pais: "Nicaragua / +505", numeroPrefijo: "+505" },
  { pais: "Costa Rica / +506", numeroPrefijo: "+506" },
  { pais: "Panamá / +507", numeroPrefijo: "+507" },
  { pais: "Islas Malvinas y territorios del Atlántico Sur / +500", numeroPrefijo: "+500" },
  { pais: "Perú / +51", numeroPrefijo: "+51" },
  { pais: "Argentina / +54", numeroPrefijo: "+54" },
  { pais: "Brasil / +55", numeroPrefijo: "+55" },
  { pais: "Chile / +56", numeroPrefijo: "+56" },
  { pais: "Colombia / +57", numeroPrefijo: "+57" },
  { pais: "Venezuela / +58", numeroPrefijo: "+58" },
  { pais: "Bolivia / +591", numeroPrefijo: "+591" },
  { pais: "Guyana / +592", numeroPrefijo: "+592" },
  { pais: "Ecuador / +593", numeroPrefijo: "+593" },
  { pais: "Guayana Francesa / +594", numeroPrefijo: "+594" },
  { pais: "Paraguay / +595", numeroPrefijo: "+595" },
  { pais: "Surinam / +597", numeroPrefijo: "+597" },
  { pais: "Uruguay / +598", numeroPrefijo: "+598" },

  { pais: "Egipto / +20", numeroPrefijo: "+20" },
  { pais: "Sudán del Sur / +211", numeroPrefijo: "+211" },
  { pais: "Marruecos / +212", numeroPrefijo: "+212" },
  { pais: "Sahara Occidental / +214", numeroPrefijo: "+214" },
  { pais: "Túnez / +216", numeroPrefijo: "+216" },
  { pais: "Libia / +218", numeroPrefijo: "+218" },
  { pais: "Gambia / +220", numeroPrefijo: "+220" },
  { pais: "Senegal / +221", numeroPrefijo: "+221" },
  { pais: "Mauritania / +222", numeroPrefijo: "+222" },
  { pais: "Malí / +223", numeroPrefijo: "+223" },
  { pais: "Guinea / +224", numeroPrefijo: "+224" },
  { pais: "Costa de Marfil / +225", numeroPrefijo: "+225" },
  { pais: "Burkina Faso / +226", numeroPrefijo: "+226" },
  { pais: "Níger / +227", numeroPrefijo: "+227" },
  { pais: "Togo / +228", numeroPrefijo: "+228" },
  { pais: "Benín / +229", numeroPrefijo: "+229" },
  { pais: "Mauricio / +230", numeroPrefijo: "+230" },
  { pais: "Liberia / +231", numeroPrefijo: "+231" },
  { pais: "Sierra Leona / +232", numeroPrefijo: "+232" },
  { pais: "Ghana / +233", numeroPrefijo: "+233" },
  { pais: "Nigeria / +234", numeroPrefijo: "+234" },
  { pais: "Chad / +235", numeroPrefijo: "+235" },
  { pais: "República Centroafricana / +236", numeroPrefijo: "+236" },
  { pais: "Camerún / +237", numeroPrefijo: "+237" },
  { pais: "Cabo Verde / +238", numeroPrefijo: "+238" },
  { pais: "Santo Tomé y Príncipe / +239", numeroPrefijo: "+239" },
  { pais: "Guinea Ecuatorial / +240", numeroPrefijo: "+240" },
  { pais: "Gabón / +241", numeroPrefijo: "+241" },
  { pais: "República del Congo / +242", numeroPrefijo: "+242" },
  { pais: "República Democrática del Congo / +243", numeroPrefijo: "+243" },
  { pais: "Angola / +244", numeroPrefijo: "+244" },
  { pais: "Guinea-Bisáu / +245", numeroPrefijo: "+245" },
  { pais: "Territorio Británico del Océano Índico / +246", numeroPrefijo: "+246" },
  { pais: "Isla Ascensión / +247", numeroPrefijo: "+247" },
  { pais: "Seychelles / +248", numeroPrefijo: "+248" },
  { pais: "Sudán / +249", numeroPrefijo: "+249" },
  { pais: "Ruanda / +250", numeroPrefijo: "+250" },
  { pais: "Etiopía / +251", numeroPrefijo: "+251" },
  { pais: "Somalia / +252", numeroPrefijo: "+252" },
  { pais: "Yibuti / +253", numeroPrefijo: "+253" },
  { pais: "Kenia / +254", numeroPrefijo: "+254" },
  { pais: "Tanzania / +255", numeroPrefijo: "+255" },
  { pais: "Uganda / +256", numeroPrefijo: "+256" },
  { pais: "Burundi / +257", numeroPrefijo: "+257" },
  { pais: "Mozambique / +258", numeroPrefijo: "+258" },
  { pais: "Zambia / +260", numeroPrefijo: "+260" },
  { pais: "Madagascar / +261", numeroPrefijo: "+261" },
  { pais: "Reunión y Mayotte / +262", numeroPrefijo: "+262" },
  { pais: "Zimbabue / +263", numeroPrefijo: "+263" },
  { pais: "Namibia / +264", numeroPrefijo: "+264" },
  { pais: "Malaui / +265", numeroPrefijo: "+265" },
  { pais: "Lesoto / +266", numeroPrefijo: "+266" },
  { pais: "Botsuana / +267", numeroPrefijo: "+267" },
  { pais: "Suazilandia / +268", numeroPrefijo: "+268" },
  { pais: "Comoras / +269", numeroPrefijo: "+269" },
  { pais: "Sudáfrica / +27", numeroPrefijo: "+27" },
  { pais: "Santa Elena, Ascensión y Tristán de Acuña / +290", numeroPrefijo: "+290" },
  { pais: "Eritrea / +291", numeroPrefijo: "+291" },
  { pais: "Islas Feroe / +298", numeroPrefijo: "+298" },
  { pais: "Grecia / +30", numeroPrefijo: "+30" },
  { pais: "Países Bajos / +31", numeroPrefijo: "+31" },
  { pais: "Bélgica / +32", numeroPrefijo: "+32" },
  { pais: "Francia / +33", numeroPrefijo: "+33" },
  { pais: "España / +34", numeroPrefijo: "+34" },
  { pais: "Gibraltar / +350", numeroPrefijo: "+350" },
  { pais: "Portugal / +351", numeroPrefijo: "+351" },
  { pais: "Luxemburgo / +352", numeroPrefijo: "+352" },
  { pais: "Irlanda / +353", numeroPrefijo: "+353" },
  { pais: "Islandia / +354", numeroPrefijo: "+354" },
  { pais: "Albania / +355", numeroPrefijo: "+355" },
  { pais: "Malta / +356", numeroPrefijo: "+356" },
  { pais: "Chipre / +357", numeroPrefijo: "+357" },
  { pais: "Finlandia / +358", numeroPrefijo: "+358" },
  { pais: "Bulgaria / +359", numeroPrefijo: "+359" },
  { pais: "Hungría / +36", numeroPrefijo: "+36" },
  { pais: "Lituania / +370", numeroPrefijo: "+370" },
  { pais: "Letonia / +371", numeroPrefijo: "+371" },
  { pais: "Estonia / +372", numeroPrefijo: "+372" },
  { pais: "Moldavia / +373", numeroPrefijo: "+373" },
  { pais: "Armenia / +374", numeroPrefijo: "+374" },
  { pais: "Bielorrusia / +375", numeroPrefijo: "+375" },
  { pais: "Andorra / +376", numeroPrefijo: "+376" },
  { pais: "Mónaco / +377", numeroPrefijo: "+377" },
  { pais: "San Marino / +378", numeroPrefijo: "+378" },
  { pais: "Ciudad del Vaticano / +379", numeroPrefijo: "+379" },
  { pais: "Ucrania / +380", numeroPrefijo: "+380" },
  { pais: "Serbia / +381", numeroPrefijo: "+381" },
  { pais: "Montenegro / +382", numeroPrefijo: "+382" },
  { pais: "Kosovo / +383", numeroPrefijo: "+383" },
  { pais: "Croacia / +385", numeroPrefijo: "+385" },
  { pais: "Eslovenia / +386", numeroPrefijo: "+386" },
  { pais: "Bosnia y Herzegovina / +387", numeroPrefijo: "+387" },
  { pais: "Macedonia del Norte / +389", numeroPrefijo: "+389" },
  { pais: "Italia / +39", numeroPrefijo: "+39" },
  { pais: "Rumanía / +40", numeroPrefijo: "+40" },
  { pais: "Suiza / +41", numeroPrefijo: "+41" },
  { pais: "República Checa / +420", numeroPrefijo: "+420" },
  { pais: "Eslovaquia / +421", numeroPrefijo: "+421" },
  { pais: "Liechtenstein / +423", numeroPrefijo: "+423" },
  { pais: "Austria / +43", numeroPrefijo: "+43" },
  { pais: "Reino Unido / +44", numeroPrefijo: "+44" },
  { pais: "Dinamarca / +45", numeroPrefijo: "+45" },
  { pais: "Suecia / +46", numeroPrefijo: "+46" },
  { pais: "Noruega / +47", numeroPrefijo: "+47" },
  { pais: "Polonia / +48", numeroPrefijo: "+48" },
  { pais: "Alemania / +49", numeroPrefijo: "+49" },
  { pais: "Rusia / +7", numeroPrefijo: "+7" },
  { pais: "Kazajistán / +7", numeroPrefijo: "+7" },
  { pais: "Japón / +81", numeroPrefijo: "+81" },
  { pais: "Corea del Sur / +82", numeroPrefijo: "+82" },
  { pais: "Vietnam / +84", numeroPrefijo: "+84" },
  { pais: "Corea del Norte / +850", numeroPrefijo: "+850" },
  { pais: "Hong Kong / +852", numeroPrefijo: "+852" },
  { pais: "Macao / +853", numeroPrefijo: "+853" },
  { pais: "Camboya / +855", numeroPrefijo: "+855" },
  { pais: "Laos / +856", numeroPrefijo: "+856" },
  { pais: "China / +86", numeroPrefijo: "+86" },
  { pais: "Bangladés / +880", numeroPrefijo: "+880" },
  { pais: "Taiwán / +886", numeroPrefijo: "+886" },
  { pais: "Turquía y Norte de Chipre / +90", numeroPrefijo: "+90" },
  { pais: "India / +91", numeroPrefijo: "+91" },
  { pais: "Pakistán / +92", numeroPrefijo: "+92" },
  { pais: "Afganistán / +93", numeroPrefijo: "+93" },
  { pais: "Sri Lanka / +94", numeroPrefijo: "+94" },
  { pais: "Birmania (Myanmar) / +95", numeroPrefijo: "+95" },
  { pais: "Maldivas / +960", numeroPrefijo: "+960" },
  { pais: "Líbano / +961", numeroPrefijo: "+961" },
  { pais: "Jordania / +962", numeroPrefijo: "+962" },
  { pais: "Siria / +963", numeroPrefijo: "+963" },
  { pais: "Irak / +964", numeroPrefijo: "+964" },
  { pais: "Kuwait / +965", numeroPrefijo: "+965" },
  { pais: "Arabia Saudita / +966", numeroPrefijo: "+966" },
  { pais: "Yemen / +967", numeroPrefijo: "+967" },
  { pais: "Omán / +968", numeroPrefijo: "+968" },
  { pais: "Palestina / +970", numeroPrefijo: "+970" },
  { pais: "Emiratos Árabes Unidos / +971", numeroPrefijo: "+971" },
  { pais: "Israel / +972", numeroPrefijo: "+972" },
  { pais: "Baréin / +973", numeroPrefijo: "+973" },
  { pais: "Catar / +974", numeroPrefijo: "+974" },
  { pais: "Bután / +975", numeroPrefijo: "+975" },
  { pais: "Mongolia / +976", numeroPrefijo: "+976" },
  { pais: "Nepal / +977", numeroPrefijo: "+977" },
  { pais: "Irán / +98", numeroPrefijo: "+98" },
  { pais: "Tayikistán / +992", numeroPrefijo: "+992" },
  { pais: "Turkmenistán / +993", numeroPrefijo: "+993" },
  { pais: "Azerbaiyán / +994", numeroPrefijo: "+994" },
  { pais: "Georgia / +995", numeroPrefijo: "+995" },
  { pais: "Kirguistán / +996", numeroPrefijo: "+996" },
  { pais: "Uzbekistán / +998", numeroPrefijo: "+998" },
  { pais: "Malasia / +60", numeroPrefijo: "+60" },
  { pais: "Australia / +61", numeroPrefijo: "+61" },
  { pais: "Indonesia / +62", numeroPrefijo: "+62" },
  { pais: "Filipinas / +63", numeroPrefijo: "+63" },
  { pais: "Nueva Zelanda e Islas Pitcairn / +64", numeroPrefijo: "+64" },
  { pais: "Singapur / +65", numeroPrefijo: "+65" },
  { pais: "Tailandia / +66", numeroPrefijo: "+66" },
  { pais: "Timor Oriental / +670", numeroPrefijo: "+670" },
  { pais: "Isla Norfolk / +672", numeroPrefijo: "+672" },
  { pais: "Brunéi / +673", numeroPrefijo: "+673" },
  { pais: "Nauru / +674", numeroPrefijo: "+674" },
  { pais: "Papúa Nueva Guinea / +675", numeroPrefijo: "+675" },
  { pais: "Tonga / +676", numeroPrefijo: "+676" },
  { pais: "Islas Salomón / +677", numeroPrefijo: "+677" },
  { pais: "Vanuatu / +678", numeroPrefijo: "+678" },
  { pais: "Fiyi / +679", numeroPrefijo: "+679" },
  { pais: "Palaos / +680", numeroPrefijo: "+680" },
  { pais: "Wallis y Futuna / +681", numeroPrefijo: "+681" },
  { pais: "Islas Cook / +682", numeroPrefijo: "+682" },
  { pais: "Niue / +683", numeroPrefijo: "+683" },
  { pais: "Samoa / +685", numeroPrefijo: "+685" },
  { pais: "Kiribati / +686", numeroPrefijo: "+686" },
  { pais: "Nueva Caledonia / +687", numeroPrefijo: "+687" },
  { pais: "Tuvalu / +688", numeroPrefijo: "+688" },
  { pais: "Polinesia Francesa / +689", numeroPrefijo: "+689" },
  { pais: "Tokelau / +690", numeroPrefijo: "+690" },
  { pais: "Micronesia / +691", numeroPrefijo: "+691" },
  { pais: "Islas Marshall / +692", numeroPrefijo: "+692" }
];



const InputFechaModificado = ({
  label,
  type = "text",
  backGraundLabel = "#FFFFFF",
  labelColor = "#94a3b8",
  handler,
  borderColor = "border-gray-300",
  borderColorSelect = "border-orange-400",
  placeHolder,
  conten,
  svg = null,
  name
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const shouldFloat = isFocused || conten !== "";

  const formatearFecha = (valor) => {
    let soloNumeros = valor.replace(/\D/g, "").slice(0, 8);

    let resultado = "";
    if (soloNumeros.length > 0) resultado += soloNumeros.slice(0, 2);
    if (soloNumeros.length > 2) resultado += "/" + soloNumeros.slice(2, 4);
    if (soloNumeros.length > 4) resultado += "/" + soloNumeros.slice(4, 8);

    return resultado;
  };

  const handleChange = (e) => {
    const valorFormateado = formatearFecha(e.target.value);
    handler({ target: { name, value: valorFormateado } });
    if (error) setError(false);
  };

  const validarFecha = (fechaStr) => {
    if (!fechaStr || fechaStr.trim() === "") return true; // Válido si está vacío (opcional)
    
    const partes = fechaStr.split("/");
    if (partes.length !== 3) return false;

    const [dia, mes, anio] = partes.map(Number);

    if (
      isNaN(dia) || isNaN(mes) || isNaN(anio) ||
      dia < 1 || dia > 31 ||
      mes < 1 || mes > 12 ||
      anio < 1900 || anio > 2100
    ) {
      return false;
    }

    const fecha = new Date(anio, mes - 1, dia);
    return (
      fecha.getFullYear() === anio &&
      fecha.getMonth() === mes - 1 &&
      fecha.getDate() === dia
    );
  };

  const handleBlur = () => {
    setIsFocused(false);
    const esValida = validarFecha(conten);
    setError(!esValida);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        className={`w-full p-4 relative border flex items-center rounded transition-all duration-300 ${
          error
            ? "border-red-500"
            : isFocused
            ? borderColorSelect
            : borderColor
        }`}
      >
        {svg && svg}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          placeholder={isFocused ? "DD/MM/YYYY" : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          value={conten}
          onChange={handleChange}
          className={`ml-1 font-medium text-[#666] bg-white text-[14px] outline-none transition-all ${
            svg ? "w-[80%]" : "w-full"
          }`}
        />
        <label
          className={`absolute left-2 font-medium transition-all duration-200 px-1 pointer-events-none z-10 ${
            shouldFloat
              ? `-top-1 text-[11px] p-1`
              : `top-[50%] left-2 -translate-y-1/2 text-[14px]`
          }`}
          style={{
            color: shouldFloat ? "#666" : "#666",
          }}
        >
          {label}
        </label>
      </div>

      {error && (
        <span className="text-red-500 text-sm ml-1">Fecha incorrecta</span>
      )}
    </div>
  );
}



export default function Pasajeros(){
    const router = useRouter()
    const dispatch = useDispatch()
    const [acceso, setAcceso] = useState(false)
    const [isFocusedEmail, setIsFocusedEmail] = useState(false)
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false)
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const { money, codeCountry } = useSelector(state => state.country)
    const {cantPasajeros, precio} = useSelector(state => state.homeReducer)
    const arrayUsuario = Array.from({ length: cantPasajeros }, (_, i) => i + 1)
    const inputRef = useRef(null)
    // Estado para manejar la información de cada pasajero
    const [pasajeros, setPasajeros] = useState([])
    
    // Estado para datos de contacto
    const [datosContacto, setDatosContacto] = useState({
        email: "",
        prefijo: "34",
        numeroCelular: ""
    })

    const [checkboxesPasajeros, setCheckboxesPasajeros] = useState([])

    useEffect(() => {
        setPasajeros(
            arrayUsuario.map(() => ({
                nombre: "",
                apellido: "",
                documento: "",
                fechaExpedicion: "",
                necesidadesEspeciales: false,
                tarjetaFidelizacion: false,
                programaEmpresas: false
            }))
        )

        setCheckboxesPasajeros(
            arrayUsuario.map(() => ({
                necesidadesEspeciales: false,
                tarjetaFidelizacion: false,
                programaEmpresas: false
            }))
        )
    }, [cantPasajeros])

    // Handler para inputs de login
    const handlerLoginInput = (setter) => (e) => {
        setter(e.target.value)
    }

    // Handler para inputs de información de pasajeros
    const handlerInputs = (index, field) => (e) => {
        const newPasajeros = [...pasajeros]
        newPasajeros[index][field] = e.target.value
        setPasajeros(newPasajeros)
    }

    // Handler para fecha de expedición
    const handleChangeFecha = (index, field) => (e) => {
        const newPasajeros = [...pasajeros]
        newPasajeros[index][field] = e.target.value
        setPasajeros(newPasajeros)
    }

    // Handler para checkboxes de pasajeros
    const handleCheckboxChange = (index, field) => (e) => {
        const newPasajeros = [...pasajeros]
        newPasajeros[index][field] = e.target.checked
        setPasajeros(newPasajeros)
    }

    // Handler para datos de contacto
    const handlerDatosContacto = (field) => (e) => {
        setDatosContacto(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    // Handler para select de prefijo
    const handlerSelectPrefijo = (e) => {
        setDatosContacto(prev => ({
            ...prev,
            prefijo: e.target.value
        }))
    }

    const validarFormulario = () => {
        // Validar datos de cada pasajero
        for (let i = 0; i < pasajeros.length; i++) {
            const pasajero = pasajeros[i]
            if (!pasajero.nombre || !pasajero.apellido || !pasajero.documento) {
                alert(`Por favor, complete todos los campos obligatorios del pasajero ${i + 1}`)
                return false
            }
        }

        // Validar datos de contacto
        if (!datosContacto.email || !datosContacto.numeroCelular) {
            alert("Por favor, complete todos los campos de contacto")
            return false
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(datosContacto.email)) {
            alert("Por favor, ingrese un email válido")
            return false
        }

        return true
    }
    const handleSubmit = () => {
        if (validarFormulario()) {
            const datosCompletos = {
                pasajeros,
                datosContacto,
                login: {
                    email: emailValue,
                    password: passwordValue
                }
            }
            
        
            dispatch(setInfoPasajeros(datosCompletos.pasajeros))           
            router.push("/compra")
        }
    }

    useEffect(() => {
        if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    return(
        <div className="w-full flex justify-center items-center bg-[#f3f2f6]" >
            <div className="w-[95%] flex flex-col justify-center items-center">
                <h4 className="font-[iberiaheadline] text-[32px] font-semibold text-[#333] mt-3.5">Información de pasajeros</h4>
                <p className="font-[iberiaheadline] text-[15px] text-[#333] mt-1.5">Los datos de los pasajeros deben coincidir con la documentación que presenten en el momento del vuelo.</p>
                
                {/* Sección de Login */}
                <div className="w-full bg-white p-4 border-t-2 border-t-[#d7192d] mt-5">
                    <button onClick={() => setAcceso(a => !a)} className="w-full py-2 flex justify-between">
                        <p className="text-[16px] font-medium">Accede ahora a Iberia</p>
                        <div className={`text-[#d7192d] transition-transform ${acceso ? "rotate-180" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </button>
                    
                    {acceso && (
                        <div className="w-full flex flex-col">
                            <p className="font-medium text-[14px] mt-1.5">Accede para hacer tu reserva, así recuperarás tus datos de pasajero, acumularás los 875 Avios de esta reserva y podrás ahorrar hasta 195,37€</p>
                            <div className="mt-4">
                                <div className={`w-[90%] border border-[#e6e6e6] flex items-center relative pt-6 pb-3 pl-4 pr-4 transition-all duration-300 ${isFocusedEmail ? "border-orange-400" : ""}`}>
                                    <input 
                                        autoComplete="off" 
                                        className="outline-none w-full font-medium text-[15px]" 
                                        onFocus={() => setIsFocusedEmail(true)}
                                        onBlur={() => setIsFocusedEmail(false)}
                                        value={emailValue}
                                        onChange={handlerLoginInput(setEmailValue)}
                                        type="text"
                                    />
                                    <span className={`absolute transition-all duration-300 left-2 pointer-events-none font-medium ${isFocusedEmail || emailValue !== "" ? "top-1 pl-1 text-[11px]" : "text-[13px]"}`}>
                                        Email o n° Iberia Club
                                    </span>
                                </div>
                                
                                <div className={`w-[90%] mt-3 border border-[#e6e6e6] flex items-center relative pt-6 pb-3 pl-4 pr-4 transition-all duration-300 ${isFocusedPassword ? "border-orange-400" : ""}`}>
                                    <input 
                                        autoComplete="off" 
                                        className="outline-none w-full font-medium text-[15px]" 
                                        onFocus={() => setIsFocusedPassword(true)}
                                        onBlur={() => setIsFocusedPassword(false)}
                                        value={passwordValue}
                                        onChange={handlerLoginInput(setPasswordValue)}
                                        type="password"
                                    />
                                    <span className={`absolute transition-all duration-300 left-2 pointer-events-none font-medium ${isFocusedPassword || passwordValue !== "" ? "top-1 pl-1 text-[11px]" : "text-[13px]"}`}>
                                        Contraseña
                                    </span>
                                </div>
                                
                                <div className="w-full mt-6">
                                    <button className="w-full py-2.5 text-[14px] text-white bg-[#d7192d] mb-3">
                                        Iniciar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Sección de Pasajeros */}
                {arrayUsuario.map((pasajero, index) => (
                    <div key={index} className="w-full bg-white p-4 mt-8">
                        <div className="flex items-center text-[#d7192d] mt-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-standing" viewBox="0 0 16 16">
                                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0"/>
                            </svg>
                            <p className="text-[15px] ml-2">Pasajero {pasajero}:</p>
                        </div>
                        <p className="text-[15px] text-[#d7192d] ml-7">Adulto</p>
                        
                        <div className="mt-5 flex flex-col gap-y-3 w-full">
                            <InputModificado
                                ref={index == 0 ? inputRef : undefined}
                                name="nombre" 
                                label="Nombre" 
                                handler={handlerInputs(index, 'nombre')} 
                                value={pasajeros[index]?.nombre || ""}
                            />
                            <InputModificado 
                                name="apellido" 
                                label="Apellido" 
                                handler={handlerInputs(index, 'apellido')} 
                                value={pasajeros[index]?.apellido || ""}
                            />
                            <InputModificado 
                                name="documento" 
                                label="Numero de documento" 
                                handler={handlerInputs(index, 'documento')} 
                                value={pasajeros[index]?.documento || ""}
                            />
                            <InputFechaModificado 
                                label={"Fecha de expedicion (opcional)"} 
                                name={"fechaExpedicion"} 
                                conten={pasajeros[index]?.fechaExpedicion || ""} 
                                handler={handleChangeFecha(index, 'fechaExpedicion')}
                            />
                            
                            {/* Checkboxes */}
                            <label className="flex items-center">
                                <input 
                                    className="w-5 h-5" 
                                    type="checkbox" 
                                    checked={pasajeros[index]?.necesidadesEspeciales || false}
                                    onChange={handleCheckboxChange(index, 'necesidadesEspeciales')}
                                />
                                <span className="text-[14px] font-medium ml-2">Necesidades especiales.</span>
                            </label>
                            
                            <label className="flex">
                                <input 
                                    className="w-5 h-5" 
                                    type="checkbox" 
                                    checked={pasajeros[index]?.tarjetaFidelizacion || false}
                                    onChange={handleCheckboxChange(index, 'tarjetaFidelizacion')}
                                />
                                <div className="w-full">
                                    <span className="text-[14px] font-medium ml-2">Es titular de la tarjeta Iberia Club o de otra tarjeta de fidelización</span>
                                </div>
                            </label>
                            
                            <label className="flex pb-4">
                                <input 
                                    className="w-5 h-5" 
                                    type="checkbox" 
                                    checked={pasajeros[index]?.programaEmpresas || false}
                                    onChange={handleCheckboxChange(index, 'programaEmpresas')}
                                />
                                <div className="w-full">
                                    <span className="text-[14px] font-medium ml-2">Forma parte de un programa de empresas.</span>
                                </div>
                            </label>
                        </div>
                    </div>
                ))}

                {/* Sección de Datos de Contacto */}
                <div className="w-full bg-white p-4 mt-8">
                    <div className="flex items-center text-[#d7192d] mt-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg>
                        <p className="text-[15px] ml-2">Datos de contacto</p>
                    </div>
                    
                    <p className="text-[#777] text-[14px] font-medium mt-2.5">
                        Usaremos tu dirección de correo electrónico y tu número de teléfono móvil para informarte sobre cualquier novedad que se produzca en tus vuelos. También para enviarte un e-mail recordatorio y ayudarte a completar tu reserva.
                    </p>
                    
                    <div className="mt-3 flex flex-col gap-y-4 pb-3">
                        <InputModificado 
                            name="email" 
                            label="E-mail" 
                            handler={handlerDatosContacto('email')} 
                            value={datosContacto.email}
                        />
                        
                        <div className="w-full flex gap-2">
                            <div className="w-[30%]">
                                <div className={`w-[90%] border border-[#e6e6e6] flex items-center relative pt-6 pb-3 pl-4 pr-4 transition-all duration-300 text-[#666] ${isFocused ? "border-orange-400":""}`}>
                                    <div className="w-full flex">
                                        <span className={isFocused || datosContacto.prefijo != ""  ? "text-[14px] font-medium": "hidden"}>+</span>
                                        <input type={"number"} autoComplete="off" inputMode={`numeric`}  pattern="[0-9]*"  name={"prefijo"} value={datosContacto.prefijo} onChange={(e)=>handlerSelectPrefijo(e)} className="outline-none w-full font-medium text-[14px] z-10" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
                                    </div>
                                    <span className={`absolute transition-all duration-300 left-2 pointer-events-none font-medium  ${isFocused ? "top-1 pl-1 text-[11px]" : datosContacto.prefijo == "" ? " text-[12px] text-center top-5": "top-1 pl-1 text-[11px]"}`}>Prefijo</span>
                                </div>
                            </div>
                            
                            <div className="w-[70%]">
                                <InputModificado
                                    modoNumerico={true}
                                    name="numeroCelular" 
                                    label="Número de teléfono" 
                                    handler={handlerDatosContacto('numeroCelular')} 
                                    value={datosContacto.numeroCelular}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white p-4 mt-8">
                    <p className="text-[14px] text-[#777] font-medium pt-2">Precio total</p>
                    <p className="mt-3 text-[32px] font-[iberiaheadline]">{precio.toLocaleString(`es-${codeCountry}`)} {money}</p>
                    <button onClick={handleSubmit} className="w-full py-3 mt-3 bg-[#d7192d] text-white font-semibold text-[16px] hover:bg-[#c01727] transition-colors">
                        Continuar
                    </button>
                    <p className="text-[14px] text-[#777] font-medium mt-4">Esta reserva generará al menos 875 Avios y 175 Puntos Elite entre los pasajeros registrados en Iberia Club.</p>
                    <p className="text-[14px] text-[#777] font-medium mt-4 pb-2">Precio total, incluye tarifa aérea, tasas (salvo las que se cobren en determinados aeropuertos en el momento de facturar), gastos de gestión, cargos del operador, y las opciones seleccionadas. Consulta aquí posibles gastos de gestión para cambios y reembolsos.</p>
                </div>
                               
            </div>
        </div>
    )
}