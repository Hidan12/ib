import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  city: null,
  origin: null,
  codeOrigin: null,
  destino: null,
  codeDestino: null,
  tipViaje: "idaYVuelta",
  cargando: true,
  cambioFecha: false,
  fechPartida: null,
  fechRegreso: null,
  cantPasajeros: 1,
  pasajeroAdulto: 1,
  pasajeroNinio: 0,
  pasajeroBebe: 0,
  informacionPasajeros: null,
  precio: 0,
  copiaPrecio: 0,
  precioSelec: 0,
  cabina: "Economy",
  img: "./assets/footer/captura.png",
  vueloSelecIda: {},
  vueloselcVuelta: {},
}

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeDestino(state, action) {
      state.destino = action.payload.origin
      state.codeDestino = action.payload.code
    },
    changeOrigin(state, action) {
      state.origin = action.payload.origin
      state.codeOrigin = action.payload.code
    },
    tipoViaje(state, action) {
      state.tipViaje = action.payload
    },
    fechaPartida(state, action) {
      state.fechPartida = action.payload
      state.cambioFecha = !state.cambioFecha
    },
    fechaRegreso(state, action) {
      state.fechRegreso = action.payload
      state.cambioFecha = !state.cambioFecha
    },
    cantidadPasajeros(state, action) {
      state.pasajeroAdulto = action.payload.pasajeroAdulto
      state.pasajeroNinio = action.payload.pasajeroNinio
      state.pasajeroBebe = action.payload.pasajeroBebe
      state.cantPasajeros =
        action.payload.pasajeroAdulto + action.payload.pasajeroNinio
    },
    setInfoPasajeros(state, action){
      console.log(action.payload);
      
      state.informacionPasajeros = action.payload
    },
    ClearFecha(state) {
      state.fechPartida = null
      state.fechRegreso = null
      state.cambioFecha = false
    },
    clearIda(state) {
      state.fechRegreso = null
    },
    setPrecio(state, action) {
      state.precio = state.precio + action.payload
      state.copiaPrecio = state.precio
    },
    setCopiaPrecio(state, action){
      if (action.payload.tipoVuelo == "vuelta") {
        state.copiaPrecio = action.payload.precio + state.precio
        
      }else{
        state.copiaPrecio = action.payload.precio
      }
    },
    setPrecioClose (state){
      state.copiaPrecio = state.precio
    },
    setVuelosSelecc (state, action){
      if (action.payload.tipoVuelo == "vuelta") {
        state.vueloselcVuelta = action.payload.vuelo
        
      }else{
        state.vueloSelecIda = action.payload.vuelo
      }
    },
    intercambioOriDes(state) {
      const temp = state.origin
      state.origin = state.destino
      state.destino = temp
    },
    setCabina(state, action) {
      state.cabina = action.payload
    },
  },
})

export const {
  changeDestino,
  changeOrigin,
  tipoViaje,
  fechaPartida,
  fechaRegreso,
  cantidadPasajeros,
  setInfoPasajeros,
  ClearFecha,
  clearIda,
  setPrecio,
  setPrecioClose,
  setCopiaPrecio,
  intercambioOriDes,
  setCabina,
  setVuelosSelecc
} = homeSlice.actions

export default homeSlice.reducer
