import React, { useEffect, useState, useContext } from 'react'

import { Typography } from '@mui/material'
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


import { auth, handleLike, getData } from '../../helper/firebase';
import PostComment from './PostComment';

import { DataContext } from '../../context/DataContext';
import { Link } from 'react-router-dom';


const DashboardCard = ({ post, postId, num }) => {


    const { posts, setPosts } = useContext(DataContext)

    const writer = auth.currentUser ? auth.currentUser.email : null

    const [comment, setComment] = useState(false)
    const [begendin, setBegendin] = useState(post.likes.filter((item) => item === writer))
    const [yorum, setYorum] = useState(post.comments)

    useEffect(() => {
        setYorum(post.comments)
        setBegendin(post.likes.filter((item) => item === writer))
    }, [])

    useEffect(() => {
        getData(setPosts)
    }, [])

    const handleClick = () => {

        if (post.likes.find((item) => item === writer)) {

            const newLikes = post.likes
            newLikes.pop(writer)

            handleLike(newLikes, postId)

            setBegendin([])
        } else {

            const newLikes = post.likes
            newLikes.push(writer)

            handleLike(newLikes, postId)

            setBegendin([writer])
        }

    }


    return (

        <Box
            sx={{
                width: "auto",
                position: "relative",
                // bgcolor: "red",
            }}
        >

            <Card sx={{ maxWidth: 345, minWidth: 250 }}>

                <CardHeader

                    sx={{ bgcolor: "#2F80CC", }}

                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {post.writer[0].toUpperCase()}
                        </Avatar>
                    }

                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }

                    title={post.writer}

                    subheader={post.time}

                />

                <Box sx={{ position: "relative", }}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={post.imgUrl}
                        alt="Paella dish"
                    >
                    </CardMedia>
                    <Typography
                        sx={{
                            position: "absolute",
                            left: "20px",
                            bottom: "20px",
                            fontSize: "1.3em",
                            color: "white",
                            fontWeight: "bold",
                        }}>
                        {post.title}
                    </Typography>
                </Box>

                <CardContent
                    sx={{
                        // bgcolor: "#2F80CC",
                        height: "150px",
                        overflow: "hidden",
                        p: 4,
                    }}
                >
                    <Typography variant="div" color="text.secondary" >
                        {post.content.slice(0, 160) + "..."}
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
                    <Typography>{post.likes.length}</Typography>


                    <IconButton aria-label="share" onClick={() => setComment(!comment)}>
                        <CommentBank />
                    </IconButton>
                    <Typography>{yorum.length}</Typography>

                    {comment ? (<PostComment comment={yorum} postId={postId} />) : ""}

                    <Link to={"/detail/" + num}>
                        <IconButton aria-label="share">
                            <MoreSharp />
                        </IconButton>
                    </Link>


                </CardActions>

            </Card>
        </Box>

    )
}

export default DashboardCard
