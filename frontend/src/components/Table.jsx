import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'prn', headerName: 'PRN', width: 130 },
  { field: 'year', headerName: 'Year', type: 'text', width: 50 },
  { field: 'class', headerName: 'Class', width: 130 },
  { field: 'classTeacher', headerName: 'Class teacher', width: 130 },
  { field: 'phone', headerName: 'Phone', type: 'phone', width: 120 },
];

const rows = [
  { id: 1, name: 'John Doe', prn: 'PRN001', year: '2nd', class: 'CS-A', classTeacher: 'Prof. Smith', phone: 1234567890 },
  { id: 2, name: 'Jane Smith', prn: 'PRN002', year: '3rd', class: 'IT-B', classTeacher: 'Prof. Johnson', phone: 2345678901 },
  { id: 3, name: 'Bob Wilson', prn: 'PRN003', year: '1st', class: 'ME-C', classTeacher: 'Prof. Brown', phone: 3456789012 },
  { id: 4, name: 'Alice Taylor', prn: 'PRN004', year: '4th', class: 'EE-A', classTeacher: 'Prof. Davis', phone: 4567890123 },
  { id: 5, name: 'Charlie Evans', prn: 'PRN005', year: '2nd', class: 'CE-B', classTeacher: 'Prof. Wilson', phone: 5678901234 },
  { id: 6, name: 'Eva Martinez', prn: 'PRN006', year: '3rd', class: 'CS-C', classTeacher: 'Prof. Anderson', phone: 6789012345 },
  { id: 7, name: 'David Lee', prn: 'PRN007', year: '1st', class: 'IT-A', classTeacher: 'Prof. Taylor', phone: 7890123456 },
  { id: 8, name: 'Grace Kim', prn: 'PRN008', year: '4th', class: 'ME-B', classTeacher: 'Prof. Thomas', phone: 8901234567 },
  { id: 9, name: 'Frank Chen', prn: 'PRN009', year: '2nd', class: 'EE-C', classTeacher: 'Prof. Garcia', phone: 9012345678 },
];

const paginationModel = { page: 0, pageSize: 7 };

export default function DataTable() {
  return (
    <div style={{ height: 'max-content', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[7, 14, 21]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}
