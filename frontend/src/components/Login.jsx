import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../redux/features/auth/authSlice'
import {
  ChakraProvider,
  Input,
  Stack,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useLoginMutation } from '../redux/api/usersApiSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData // Destructure email and password from formData
  const [showPassword, setShowPassword] = useState(false)
  const [loginUser, { isLoading }] = useLoginMutation()
  const auth = useSelector((state) => state.auth)
  const userInfo = auth ? auth.userInfo : null

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.role) {
        case 'admin':
          navigate('/admin/manage-users')
          break
        case 'teacher':
          navigate('/teacher/courses')
          break
        case 'student':
          navigate('/student/courses')
          break
        default:
          navigate('/dashboard')
      }
    }
  }, [navigate, userInfo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value })) // Update formData dynamically
  }

  const handleLogin = async () => {
    try {
      const response = await loginUser(formData).unwrap() // Call the API with the correct payload
      dispatch(setCredentials(response))
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <ChakraProvider>
      <div>
        <section className="flex justify-center items-center h-screen">
          <section className="m-auto">
            <Stack spacing={2} direction="column" align="left" width={'350px'}>
              <Text className={`text-[#7065FF] text-[30px] font-bold mb-5`}>
                Login
              </Text>

              <Text className={`text-[#585858] text-[14px]`}>Email</Text>
              <Input
                size="sm"
                width={'350px'}
                style={{ padding: '5px' }}
                className="rounded border border-gray-300"
                name="email" // Added name attribute
                value={email}
                onChange={handleInputChange} // Use the new input change handler
              />

              <Text className={`text-[#585858] text-[14px]`}>Password</Text>
              <InputGroup size="sm">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  width="350px"
                  className="rounded border border-gray-300"
                  name="password" // Added name attribute
                  value={password}
                  onChange={handleInputChange} // Use the new input change handler
                  autoFocus={
                    document.activeElement ===
                    document.getElementById('password-input')
                  }
                  id="password-input"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Text className="text-right">
                <a
                  href="#"
                  style={{
                    color: '#7065FF',
                    textDecoration: 'none',
                    fontSize: '12px',
                  }}
                >
                  Forgot password?
                </a>
              </Text>

              <Button
                style={{
                  backgroundColor: '#7065FF',
                  color: 'white',
                  borderRadius: '5px',
                  height: '35px',
                }}
                size="xs"
                onClick={handleLogin}
                isLoading={isLoading} // Add loading state for the button
              >
                Login
              </Button>
            </Stack>
          </section>
        </section>
      </div>
    </ChakraProvider>
  )
}

export default Login
