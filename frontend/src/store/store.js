import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employeeSlice.js";
import departmentReducer from "../features/departmentSlice.js";

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
        department: departmentReducer,
    }
})