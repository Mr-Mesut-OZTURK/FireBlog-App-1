import { Badge, Container, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState, useEffect } from 'react'
import { Button, Typography } from '@mui/material';
import { auth, getData, handleComment } from '../../helper/firebase';
import { DataContext } from '../../context/DataContext';



const PostComment = ({ comment, postId }) => {

    const { setPosts } = useContext(DataContext)

    const [text, setText] = useState("")
    const [comerror, setComerror] = useState(false)
    const [yorum, setYorum] = useState([])

    useEffect(() => {
        // console.log("yorum")
        // getData(setPosts)
        setYorum(comment)
    },[])
    
    const handleClick = () => {
        if (text.length > 5) {
            
            const time = new Date().toLocaleString()
            const writer = auth.currentUser.email
            
            console.log(text)
            console.log(postId)
            const newComment = {
                comment:text,
                time:time,
                writer:writer,
            }
            handleComment(comment, newComment, postId)
            
            setComerror(false)
            setText("")
            getData(setPosts)

        } else {
            setComerror(true)
        }

    }

    return (
        <Container

            sx={{
                backgroundColor: "white",
                width: "80%",
                minHeight: "300px",
                position: "absolute",
                bottom: "70px",
                left: "10%",
                boxShadow: "0 0 10px 0 black"
            }}
        >
            <Box
                variant="form"
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                    gridGap: "10px",
                    padding: "10px",

                }}
            >

                <TextField
                    id="comment"
                    name="comment"
                    type="text"
                    label="Comment here ..."
                    variant="outlined"
                    size="small"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {comerror ? <Typography color="red" mt={-1} ml={1} >Can't be empty...</Typography> : ""}

                <Button onClick={auth.currentUser?handleClick:()=>alert("giriş yapmalısın")} variant="contained">Submit</Button>

            </Box>

            <Box
                sx={{
                    width: "100%",
                    maxHeight: "350px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                    gridGap: "10px",
                    padding: "10px",
                    overflowY: "auto",

                }}
            >
                <Typography >comments...</Typography>
                {
                    yorum.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                border: "solid",
                                padding: "5px",
                                position: "relative",
                            }}
                        >
                            <Badge
                                sx={{
                                    bgcolor: "black",
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    color: "white",
                                    p: "2px",
                                    fontSize: "1.3em",
                                    borderRadius: "2px",
                                }}
                            >{index +1}</Badge>
                            <Typography color="red" fontSize="10px">{item.writer}</Typography>
                            <Typography fontSize="10px">{item.time}</Typography>
                            <Typography p="3px" pl={3} bgcolor="navy" color="white" >{item.comment}</Typography>
                        </Box>
                    ))
                }

            </Box>

        </Container>
    )
}

export default PostComment
