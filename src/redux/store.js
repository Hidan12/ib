import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './slices/homeSlice'
import country from "./slices/countrySlice"
import facturacion from "./slices/facturacionSlice"
export const store = configureStore({
  reducer: {
    homeReducer: homeReducer,
    country: country,
    facturacion: facturacion
  }
})

