import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
    name: 'addtask',
    initialState: {
        task : [] ,
        taskid: 0
    },
    reducers: {
        settask(state, action) {
            state.task = action.payload
        },
        settaskid(state, action) {
            state.taskid = state.taskid+1
        }
    }

})

export const counterActions = CounterSlice.actions;
export default CounterSlice;