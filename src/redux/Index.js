import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./CounterSlice";

const store = configureStore({
    reducer : {addtask : CounterSlice.reducer}
})

export default store;