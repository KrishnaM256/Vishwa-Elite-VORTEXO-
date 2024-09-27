import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: (() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
      console.error('Error parsing userInfo from localStorage:', error);
      return null;
    }
  })(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      const expireIn = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      localStorage.setItem('expireIn', expireIn)
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.clear()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer