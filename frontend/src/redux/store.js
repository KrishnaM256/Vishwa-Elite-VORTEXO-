import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice'
import authReducer from './features/auth/authSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Manages API state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Adds RTK Query middleware
  devTools: true, // Enables Redux DevTools in development
})

// Enables automatic query refetching on focus, reconnect, etc.
setupListeners(store.dispatch)

export default store
