import { createSlice } from '@reduxjs/toolkit';

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        value: [],
    },
    reducers: {
        setEmployees: (state, action) => {
            state.value = action.payload;
        },
        addEmployee: (state, action) => {
            state.value = [action.payload, ...state.value]
        }
    },
})


// Action creators are generated for each case reducer function
export const { setEmployees, addEmployee } = employeesSlice.actions

export default employeesSlice.reducer