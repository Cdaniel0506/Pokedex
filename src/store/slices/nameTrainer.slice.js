import { createSlice } from "@reduxjs/toolkit";


const nameTrainerSlice = createSlice({
    name: 'nameTrainer',
    initialState:localStorage.getItem('nameTrainer') ?? "",
    reducers:{
        setNameTrainerGlobal: (state,action) => {
            {/*El localStorege nos sirve para almacenar datos en el navegador y esto nos sirve para cuando recarguemos lapagina no perdamos el inicio de secion.
            y el navegador entienda que hat una persona logueada*/}
            localStorage.setItem("nameTrainer",action.payload)
            return action.payload
        },
        logOut: () => {
            localStorage.removeItem("nameTrainer")
            return ""
        }
    }
});

export  const { setNameTrainerGlobal, logOut} = nameTrainerSlice.actions

export default nameTrainerSlice.reducer