import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from "../../context/DataContext"

import { Container, Typography, Box, Button } from '@mui/material'

import DashboardCard from './DashboardCard';
import { useHistory } from 'react-router-dom';



const Dashboard = () => {

    const history = useHistory()

    const { posts } = useContext(DataContext)

    const [data, setData] = useState(posts)

    useEffect(() => {
        setData(posts)
        // console.log("Dashboard")
    }, [posts])

    return (
        <Container
            sx={{
                width: "100%",
                minHeight: "90vh",
                // backgroundColor: "#56CCF2",
                p: 3,
                pt: 8,
            }}
        >

            <Button
            variant="contained"
            color="primary"
                onClick={() => history.push("/chat")}
            >
                Chat
            </Button>

            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 5,
                }}
            >
                DASHBOARD
            </Typography>

            <Box
                sx={{
                    // maxWidth: "1200px",
                    display: "flex",
                    // alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gridGap: "30px",
                    // border: "solid",
                }}
            >
                {
                    data.map((post, index) => (
                        <DashboardCard num={index} key={index} post={post.data()} postId={post.id}>
                            {/* {console.log(post.id)} */}

                        </DashboardCard>
                    ))
                }
            </Box>

        </Container>
    )
}

export default Dashboard
