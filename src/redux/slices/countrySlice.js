import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "",
  money: "",
  ip: "",
  codeCountry: "",
  bancos: "",
  loading: true
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountryData(state, action) {
      console.log(action.payload);
      state.country = action.payload.location;
      state.codeCountry = action.payload.location;
      state.money = action.payload.money;
      state.bancos = action.payload.bancos;
      state.ip = action.payload?.ip || "unknown"
      state.loading = false
    }
  }
});

export const { setCountryData } = countrySlice.actions;
export default countrySlice.reducer;
