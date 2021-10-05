import {  Send, } from '@mui/icons-material'
import { TextField, Typography, IconButton, Grid } from '@mui/material'
import { Box, } from '@mui/system'
import alertify from 'alertifyjs'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth, sentMessage } from '../../helper/firebase'

const ChatScreen = ({ chats }) => {
    // console.log(chats.length>1?chats[0][1]:chats)

    const user = auth.currentUser.email
    const [text, setText] = useState("")



    const handleSentMessage = () => {
        const time = new Date().toLocaleString()

        const data = {
            writer: user,
            time: time,
            message: text,
        }

        let newChat = []

        chats.map((item) => newChat.push(...item[1].chats))

        newChat.push(data)

        // console.log(newChat)

        const id = chats.length > 0 ? chats[0][0] : ""
        // console.log(id)

        if(id!==""){

            sentMessage(newChat, id)
        }else{
            toast('🦄 Wow so easy!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            alertify.error("Konuşmak için bir oda seçmelisin!...")
            alertify.error("Buradan kimse seni duyamaz :))))")
        }

        setText("")
    }

    return (
        <Grid
        item
        md={5}
            component="div"
            sx={{
                width: "100%",
                minWidth: "250px",
                backgroundColor: "teal",
                mx:1,
                p: "10px",
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
                alignItem: "flex-start",
                justifyContent: "flex-start",

            }}
        >
       
            <Box
                sx={{
                    width: "100%",
                    minWidth: "250px",
                    height: "500px",
                    backgroundColor: "white",
                    padding: "10px",
                    overflowY: "auto",
                }}
            >

                {chats.length > 0 ?
                    (chats[0][1].chats.map((chat, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "fit-content",
                                py: "5px",
                                px: "15px",
                                bgcolor: "white",
                                borderRadius: "20px",
                                fontSize: "1.2em",
                                boxShadow: "1px 1px 10px 0 black",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    // bgcolor: "lightblue",
                                    color: "purple",
                                    fontSize: "10px",
                                }}
                            >Writer : {chat.writer}</Typography>

                            <Typography
                                sx={{
                                    bgcolor: "lightblue",
                                    color: "brown",
                                    fontSize: "10px",
                                }}
                            >Time : {chat.time}</Typography>
                            <Typography
                                sx={{

                                    // color: "white",
                                    // fontSize: "10px",
                                }}
                            > {chat.message}</Typography>
                        </Box>
                    )))
                    :
                    ("")
                }

            </Box>

            <Box
                component="form"
                sx={{
                    width: "100%",
                    display: "flex",
                    // flexDirection: "column",
                    gridGap: "10px",
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                }}
            >
                <TextField
                    id="text"
                    type="textarea"
                    name="text"
                    label="Write something..."
                    variant="outlined"
                    multiline
                    sx={{
                        width: "100%",
                        bgcolor: "white",
                        borderRadius: "5px",
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <IconButton
                    onClick={handleSentMessage}
                    sx={{
                        // bgcolor: "white",
                        color: "white",
                        p: "15px",
                    }}
                >
                    <Send />
                </IconButton>


            </Box>

        </Grid>
    )
}

export default ChatScreen;
