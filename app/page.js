
import Image from 'next/image'
import styles from './page.module.css'
import { Box, Container } from '@chakra-ui/react'
import TextEditor from './components/TextEditor'
import Navbar from './components/Navbar'

export default function Home() {
  return (

    <Box w={"100vw"} h={"full"} minH={"100vh"} pb={5} bgColor="gray.400">
      <Navbar />
      <TextEditor />
    </Box>

  )
}
