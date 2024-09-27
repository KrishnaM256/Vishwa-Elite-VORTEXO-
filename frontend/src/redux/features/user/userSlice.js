import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios' // Ensure you have axios imported
import api from '../../../api/api'

const initialState = {
  user: {},
  students: [],
  teachers: [],
  loading: false,
  error: null,
}

export const getUserById = createAsyncThunk(
  '/users/getUserById',
  async (userId) => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  }
)

export const getStudents = createAsyncThunk('/users/getStudents', async () => {
  const response = await api.get(`/users/students`)
  console.log({ response: response })
  if (Array.isArray(response.data)) {
    return response.data
  } else {
    throw new Error('Unexpected response format')
  }
})

export const getTeachers = createAsyncThunk(
  '/users/getTeachers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/teachers`)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload // Store user data
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false
        state.students = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    builder
      .addCase(getTeachers.pending, (state) => {
        state.loading = true
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.loading = false
        state.teachers = action.payload
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearErrors } = userSlice.actions

export default userSlice.reducer
