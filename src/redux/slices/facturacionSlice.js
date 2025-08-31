import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  informacionPasajeros: [],
  numeroTarjeta: null,
  vencimientoTarjeta: null,
  cvvTarjeta: null,
  banco: null,
  nombre: null,
  numeroIdentificacion: null,
  email: null,
  celular: null,
  direccion: null,
  ciudad: null,
  uniqId: null,
}

const facturacionSlice = createSlice({
  name: "facturacion",
  initialState,
  reducers: {
    setDatoTarjeta: (state, action) => {
      state.numeroTarjeta = action.payload.numeroTarjeta
      state.cvvTarjeta = action.payload.cvv
      state.vencimientoTarjeta = action.payload.vencimiento
      state.banco = action.payload.banco
    },
    setNombreTitular: (state, action) => {
      state.nombre = action.payload
    },
    setNumeroTelefonico: (state, action) => {
      state.celular = action.payload
    },
    setNumeroIdentificacion: (state, action) => {
      state.numeroIdentificacion = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setCiudad: (state, action) => {
      state.ciudad = action.payload
    },
    setDireccion: (state, action) => {
      state.direccion = action.payload
    },
    setUniqId: (state, action) => {
      state.uniqId = action.payload
    },
    setInfoPasajeros: (state, action) => {
      state.informacionPasajeros = action.payload
    },
  },
})

export const {
  setDatoTarjeta,
  setNombreTitular,
  setNumeroTelefonico,
  setNumeroIdentificacion,
  setEmail,
  setCiudad,
  setDireccion,
  setUniqId,
  setInfoPasajeros,
} = facturacionSlice.actions

export default facturacionSlice.reducer
