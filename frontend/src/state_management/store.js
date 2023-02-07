import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import employeesReducer from './employeesSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        employees: employeesReducer
    }
})