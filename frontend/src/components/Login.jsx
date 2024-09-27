import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../redux/features/auth/authSlice'
import { ChakraProvider, Input, Stack, Button, Text, InputGroup, InputRightElement } from '@chakra-ui/react'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checked, setChecked] = useState(false);

    const auth = useSelector((state) => state.auth)
    const userInfo = auth ? auth.userInfo : null

    useEffect(() => {
        if (userInfo) {
            switch(userInfo.role) {
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

    function PasswordInput() {
        const [show, setShow] = React.useState(false)
        const handleClick = () => setShow(!show)

        return (
            <InputGroup size='sm'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    width='350px'
                    className="rounded border border-gray-300"
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        )
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            // Here you would make an API call to authenticate
            // For this example, we'll simulate a response
            const response = await loginUser(email, password)
            dispatch(setCredentials(response.data))
        } catch (err) {
            // Handle error
        }
    }

    return (
        <div>
            <section className="flex justify-center items-center h-screen">
                <section className="m-auto">
                    <Stack spacing={2} direction='column' align='left' width={'350px'}>
                        <Text className={`text-[#7065FF] text-[30px] font-bold mb-5`}>Login</Text>

                        <Text className={`text-[#585858] text-[14px]`}>Email</Text>
                        <Input
                            size='sm'
                            width={'350px'}
                            style={{ padding: '5px' }}
                            className="rounded border border-gray-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Text className={`text-[#585858] text-[14px]`}>Password</Text>
                        <PasswordInput/>
                        <Text className="text-right">
                            <a href="#" style={{ color: '#7065FF', textDecoration: 'none', fontSize: '12px' }}>
                                Forgot password?
                            </a>
                        </Text>

                        <Button style={{ backgroundColor: '#7065FF', color: 'white', borderRadius: '5px', height:'35px'}} size='xs' onClick={submitHandler}>
                            Login
                        </Button>
                    </Stack>
                </section>
            </section>
        </div>
    )
}

export default Login