import React, { useState, useEffect, useContext } from 'react'
import { Typography } from '@mui/material'
import ProfileCard from './ProfileCard'

import { DataContext } from '../../context/DataContext'

import { Box } from '@mui/system'
import ProfileMenu from './ProfileMenu'
import { auth } from '../../helper/firebase'




const Profile = () => {

    const user = auth.currentUser.email
    const { posts } = useContext(DataContext)

    const [data, setData] = useState([])
    // console.log(data[0].id)

    useEffect(() => {
        setData(posts.filter((item) =>{
            return item.data().writer === user
        }))
        // console.log("profile")
    }, [posts])


    return (
        <Box
        component="div"
        fixed
        // disableGutters
            // container="true"
            spacing={1}
            sx={{
                width: "100%",
                minHeight: "90vh",
                backgroundColor: "#f1f1f1",
                // px: 3,
                pt: 5,
                mx: 0,
                margin: 0

            }}
        >
            <Box>
                <ProfileMenu />
                <Typography
                    variant="h3"
                    sx={{
                        width: "100%",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    PROFILE
                </Typography>
            </Box>

            <Box
            component="div"
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    gridGap: "40px",
                    flexWrap: "wrap",
                    p: "20px",
                    py: "100px",
                    // border: "solid",
                }}
            
            >

                {
                    data.map((post, index) => (
                        
                        <ProfileCard num={index} key={index} post={post.data()} postId={post.id}/>

                    ))
                }

            </Box>

        </Box>

    )
}

export default Profile
