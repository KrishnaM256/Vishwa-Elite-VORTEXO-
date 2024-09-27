import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/features/auth/authSlice'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header>
      <nav>
        <ul>
          {userInfo && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              {userInfo.role === 'admin' && (
                <>
                  <li>
                    <Link to="/admin/manage-users">Manage Users</Link>
                  </li>
                  <li>
                    <Link to="/admin/manage-courses">Manage Courses</Link>
                  </li>
                </>
              )}
              {userInfo.role === 'teacher' && (
                <>
                  <li>
                    <Link to="/teacher/courses">My Courses</Link>
                  </li>
                  <li>
                    <Link to="/teacher/grades">Manage Grades</Link>
                  </li>
                </>
              )}
              {userInfo.role === 'student' && (
                <>
                  <li>
                    <Link to="/student/courses">My Courses</Link>
                  </li>
                  <li>
                    <Link to="/student/grades">My Grades</Link>
                  </li>
                </>
              )}
              <li>Welcome, {userInfo.name}</li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
          {!userInfo && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
