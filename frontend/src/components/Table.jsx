import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  getStudents,
  getTeachers,
} from '../redux/features/user/userSlice'

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'prn', headerName: 'PRN', width: 130 },
  { field: 'year', headerName: 'Year', width: 50 },
  { field: 'class', headerName: 'Class', width: 130 },
  { field: 'classTeacher', headerName: 'Class teacher', width: 130 },
  { field: 'phone', headerName: 'Phone', type: 'phone', width: 120 },
]

const paginationModel = { page: 0, pageSize: 7 }

export default function DataTable() {
  const dispatch = useDispatch()

  const {
    students = [],
    teachers = [],
    loading,
    error,
  } = useSelector((state) => state.users) || {}

  useEffect(() => {
    dispatch(getStudents())
    dispatch(getTeachers())

    return () => {
      dispatch(clearErrors())
    }
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div style={{ height: 'max-content', width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[7, 14, 21]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  )
}
