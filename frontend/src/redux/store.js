import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from './api/apiSlice'
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

// Enables automatic query refetching on focus, reconnect, etc.
setupListeners(store.dispatch)

export default store
