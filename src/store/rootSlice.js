import { createSlice } from '@reduxjs/toolkit'

// Slice
const rootSlice = createSlice({
  
  name: "root",

  initialState: {
    FormStage: 1, // default page stage to show on page load
    FormUserSignup: "",
    FormUserSignup2: ""
  },

  reducers: {
    formStage: (state, action) => { state.FormStage = action.payload },
    formSignup: (state, action) => { state.FormUserSignup = action.payload },
    formSignup2: (state, action) => { state.FormUserSignup2 = action.payload }
  }

})

// Actions
export const { formStage, formSignup, formSignup2 } = rootSlice.actions
export const reducer = rootSlice.reducer;
