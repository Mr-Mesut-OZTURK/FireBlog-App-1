import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { useParams } from 'react-router'

import { Container, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CommentBank, FavoriteBorderOutlined, MoreSharp } from '@mui/icons-material';
import { Box } from '@mui/system';


import {
    auth,
    getData,
    handleLike,
} from '../../helper/firebase';
import DetailsComment from './DetailsComment';

const exampleData = {
    comments: [],
    content: "deneme",
    imgUrl: "https://cdnuploads.aa.com.tr/uploads/PhotoGallery/2020/06/26/thumbs_b2_60a632b2b2697bce69ab60bf0f73bdf8.jpg",
    likes: ['yakup@gmail.com', 'mesut8311006@gmail.com'],
    time: "27.09.2021 08:27:17",
    title: "Kelebeğin Rüyası",
    writer: "mesut8311006@gmail.com",

}

const Detail = () => {


    const { id } = useParams()
    const { posts, setPosts } = useContext(DataContext)
    const writer = auth.currentUser ? auth.currentUser.email : null


    const [data, setData] = useState(posts.length ? posts[id].data() : exampleData)
    const [postId, setPostId] = useState(posts.length ? posts[id].id : "")
    // console.log(posts.length ? posts[id].id : [])

    const [comment, setComment] = useState(false)
    const [begendin, setBegendin] = useState([]) //data.likes.filter((item) => item === writer)
    const [yorum, setYorum] = useState(data.comments)
    
    
    
    useEffect(() => {
        setPostId(posts.length ? posts[id].id : "")
        setData(posts.length ? posts[id].data() : exampleData)
        setYorum(data.comments)
        setBegendin(data.likes.filter((item) => item === writer))
    }, [posts])
    
    useEffect(() => {
        getData(setPosts)
    }, [])

    const handleClick = () => {

        if (data.likes.find((item) => item === writer)) {

            const newLikes = data.likes
            newLikes.pop(writer)
            handleLike(newLikes, postId)

            setBegendin([])
        } else {

            const newLikes = data.likes
            newLikes.push(writer)
            handleLike(newLikes, postId)

            setBegendin([writer])
        }

    }




    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "strech",
                justifyContent: "center",
                py: 10,
                minHeight: "90vh",
            }}
        >

            <Card
                sx={{
                    minWidth: 250,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "strech",
                }}>

                <CardHeader
                    sx={{
                        bgcolor: "#2F80CC",
                        width: "100%",
                    }}

                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {posts.length ? data.writer[0].toUpperCase() : ""}
                        </Avatar>
                    }

                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }

                    title={data.writer}

                    subheader={data.time}

                />

                <Box sx={{ position: "relative", }}>
                    <CardMedia
                        component="img"
                        width="90%"
                        image={data.imgUrl}
                        alt="Paella dish"
                    >
                    </CardMedia>

                </Box>


                <CardContent
                    sx={{
                        // bgcolor: "#2F80CC",
                        // height: "150px",
                        overflow: "hidden",
                        p: 4,
                    }}
                >

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "2em",
                            color: "black",
                            fontWeight: "bold",
                            pb: "20px",
                        }}>
                        {data.title}
                    </Typography>

                    <Typography variant="div" color="text.secondary" >
                        {data.content}
                    </Typography>

                </CardContent>

                <CardActions
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "#2F80ED",
                        px: 2,
                    }}
                >

                    <IconButton aria-label="add to favorites" onClick={auth.currentUser ? handleClick : () => alert("giriş yapmalısın!..")}>
                        {
                        begendin.length > 0 ?
                            (<FavoriteIcon color="error" />)
                            :
                            (<FavoriteBorderOutlined color="error" />)
                    }

                    </IconButton>
                    <Typography>{data.likes.length}</Typography>


                    <IconButton aria-label="share" onClick={() => setComment(!comment)}>
                        <CommentBank />
                    </IconButton>
                    <Typography>{yorum.length}</Typography>





                </CardActions>
                    {comment ? (<DetailsComment comment={yorum} postId={postId}  />) : ""} {/* postId={postId} */}

            </Card>
        </Container>
    )
}

export default Detail
