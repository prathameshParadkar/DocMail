"use client"

import { Box, Flex, Button, HStack, IconButton, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import { convertToHTML } from "draft-convert";
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { AttachmentIcon, DownloadIcon } from "@chakra-ui/icons";
// import BasicUsage from "./MailModal";
import DialogModal from "./MailModal";
import axios from "axios";


const TextEditor = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const [convertedContent, setConvertedContent] = React.useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    useEffect(() => {
        const raw = convertToRaw(editorState.getCurrentContent())
        const html = draftToHtml(raw)
        // console.log(html)
        setConvertedContent(html)
    }, [editorState])

    const sendMail = () => {
        onOpen()
    }

    const onDownload = () => {
        console.log('download')
        // console.log(convertedContent)
        try {
            if (convertedContent == '<p></p>') {
                toast({
                    title: "Error",
                    description: "Please write something.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return
            }
            axios.post('http://localhost:3000/api/download', { html: convertedContent })
                .then(res => {
                    console.log(res.data.downloadURL)
                    window.open(res.data.downloadURL, '_blank')
                })
            toast({
                title: "Downloaded",
                description: "Your file is downloaded.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <Flex flexDirection={'column'} mt={10} gap={10} align={"center"} w="full" h="full">

            <Box bgColor={"white"} w={1000} h={500} p={4} rounded={'lg'}>
                <Editor editorState={editorState} onEditorStateChange={setEditorState} />
            </Box>
            <HStack align={'end'}  >
                <Button
                    onClick={sendMail}
                    variant={"outline"}
                    colorScheme="green"
                    size="md" >
                    <AttachmentIcon />DocMail
                </Button>
                <Button
                    variant={"outline"}
                    colorScheme="red"
                    size="md"
                    onClick={() => setEditorState(EditorState.createEmpty())}
                >
                    Cancel
                </Button>
                <IconButton
                    icon={<DownloadIcon />}
                    onClick={onDownload}>
                </IconButton>
            </HStack>

            <DialogModal isOpen={isOpen} html={convertedContent} setEditorState={setEditorState} onClose={onClose} />

        </Flex>
    );
}

export default TextEditor