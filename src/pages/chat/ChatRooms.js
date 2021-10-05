import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { addChatRoom } from '../../helper/firebase'

const ChatRooms = ({ chatDatas, setRoom, currentRoom }) => {

    // console.log(chatDatas)

    const [createRoom, setCreateRoom] = useState("")

    const handleAddRoom = () => {

        const namecontrol = chatDatas.filter((item) => item[1].roomName === createRoom)
        if ((namecontrol.length > 0) || createRoom === "") {
            alert("Try another name!...")
        } else {
            // alert("ok name!...")
            addChatRoom(createRoom)
            setCreateRoom("")
        }
    }


    return (
        <Grid
            item
            md={5}
            sx={{
                width: "100%",
                minWidth: "250px",
                backgroundColor: "teal",
                mx: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gridGap: "10px",
                alignItem: "flex-start",
                justifyContent: "flex-start",
                // overflow: "auto",

            }}
        >
            <TextField
                color="secondary"
                variant="standard"
                name="name"
                type="text"
                value={createRoom}
                onChange={(e) => setCreateRoom(e.target.value)}
            />
            <Button
                onClick={handleAddRoom}
                color="primary"
                variant="contained"
                sx={{
                    mb: 2,
                }}
            >
                + ADD ROOM
            </Button>

            <Box
                sx={{
                    color: "white",
                    fontSize: "1.2em",
                    p: 1,
                }}
            >
                {
                    chatDatas.map((data, index) => (
                        <Button
                            key={index}
                            onClick={() => { setRoom(data[1].roomName) }}
                            variant="text"
                            color="inherit"
                            sx={{
                                width: "100%",
                                bgcolor: `${data[1].roomName === currentRoom ? "orange" : "inherit"}`
                            }}
                        >@room : {data[1].roomName}</Button>
                    ))
                }
            </Box>

        </Grid>
    )
}

export default ChatRooms
