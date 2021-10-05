import React, { useContext, useEffect, useState } from 'react'

import { ChatContext } from '../../context/ChatContext'

import ChatRooms from './ChatRooms'
import ChatScreen from './ChatScreen'
import { Grid } from '@mui/material'




const Chat = () => {

    const { messages } = useContext(ChatContext)

    const [chatDatas, setChatDatas] = useState(messages)

    const [room, setRoom] = useState("")

 
    useEffect(() => {
        setChatDatas(messages)
        // console.log("chat")
    }, [messages])

 

    return (
        <Grid
        container
            component="div"
            sx={{
                width: "100%",
                minHeight: "90vh",
                // p: "20px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "strech",
                justifyContent: "center",
                gridGap: "10px",
                py: 2,
                
            }}
        >

            <ChatRooms currentRoom={room} chatDatas={chatDatas} setRoom={setRoom} />
            <ChatScreen chats={room?chatDatas.filter((item) => item[1].roomName===room):[]} />
            {/* <Typography>-son-</Typography> */}
        </Grid>
    )
}

export default Chat


/* [
    {
        roomName: "deneme",
        chats: [
            { writer: "mesut", time: "bugün", message: "naber" },
            { writer: "halid", time: "bugün", message: "iyidir" },
        ]
    },
] */