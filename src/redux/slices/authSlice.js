import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    signupData: null,                                    // open kiye the tab darkmode kiye huye the and if we open again then it display darkmode if mode is include in token
    loading: false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}
const authSlice = createSlice(
    {
        name:"auth",
        initialState:initialState,
        reducers:{
            setSignupData(state, value) {
                state.signupData = value.payload;
            },
              setLoading(state, value) {
                state.loading = value.payload;
            },
            setToken(state,value) {
                state.token = value.payload;
            }
            
        },
    }
);
export const {setSignupData,setLoading,setToken} = authSlice.actions;
export default authSlice.reducer;