import React from 'react'
import { Stack, Button, Text, InputGroup, InputRightElement, Input } from '@chakra-ui/react'
import { FiSearch } from "react-icons/fi";


const Searchbar = () => {

    function PasswordInput() {
        const [show, setShow] = React.useState(false)
      
        return (
          <InputGroup size='md' width='350px'>
            <Input
              pr='4.5rem'
              style={{borderRadius: '10px', padding: '10px', backgroundColor: 'white'}}
              type='text'
              placeholder='Search'
            />
            <InputRightElement width='4.5rem'>
                <FiSearch className='cursor-pointer'/>
            </InputRightElement>
          </InputGroup>
        )
      }

    return (
        <div>
            <Stack>
                <PasswordInput />
            </Stack>
        </div>
    )
}

export default Searchbar