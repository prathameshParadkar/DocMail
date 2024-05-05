import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Box,
    useToast,
} from "@chakra-ui/react"
// import { EditorState } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import axios from "axios"
import React from "react"

const DialogModal = ({ isOpen, html, setEditorState, onClose }) => {
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const toast = useToast()
    const sentMail = async () => {
        console.log('sent', html)
        setLoading(true)
        try {

            axios.post('http://localhost:3000/api/mail', { email, name, html, subject })
                .then(res => {
                    console.log(res)
                })

            toast({
                title: "Mail Sent to " + email + ".",
                description: "We've sent your mail.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            setEmail('')
            setName('')
            setSubject('')
            setEditorState(EditorState.createEmpty())
            onClose()
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>To Email address</FormLabel>
                            <Input onChange={e => setEmail(e.target.value)} value={email} type='email' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>To Name</FormLabel>
                            <Input onChange={e => setName(e.target.value)} value={name} type='text' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Subject</FormLabel>
                            <Input onChange={e => setSubject(e.target.value)} value={subject} type='text' />
                        </FormControl>
                        <Box mt={4}>
                            Mail Preview
                            <Box p={6} rounded={'lg'} border={'1px solid black'}>
                                <div dangerouslySetInnerHTML={{ __html: html }} />
                            </Box>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" variant={'ghost'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={sentMail} isLoading={loading}>Mail</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )

}

export default DialogModal