import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Layout from './Layout.jsx'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminRoute from './components/routes/AdminRoute'
import TeacherRoute from './components/routes/TeacherRoute'
import StudentRoute from './components/routes/StudentRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Login />} />
      <Route path='login' element={<Login />} />
      
      <Route path='' element={<PrivateRoute />}>
        <Route path='dashboard' element={<Home />} />
        <Route path='profile' element={<About />} />
      </Route>
      
      <Route path='admin' element={<AdminRoute />}>
        {/* <Route path='manage-users' element={<ManageUsers />} />
        <Route path='manage-courses' element={<ManageCourses />} /> */}
      </Route>
      
      <Route path='teacher' element={<TeacherRoute />}>
        {/* <Route path='courses' element={<TeacherCourses />} />
        <Route path='grades' element={<ManageGrades />} /> */}
      </Route>
      
      <Route path='student' element={<StudentRoute />}>
        {/* <Route path='courses' element={<StudentCourses />} />
        <Route path='grades' element={<ViewGrades />} /> */}
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
