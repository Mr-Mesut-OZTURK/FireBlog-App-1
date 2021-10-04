import { Button, Container, MenuItem, MenuList } from '@mui/material'
import React, { useState } from 'react'
import { MenuBook, MenuOpen } from '@mui/icons-material'
import { Box, styled } from '@mui/system'
import { Link } from 'react-router-dom'


const MyLink = styled(Link)`
    text-decoration: none;
    font-size: 1.3em;
    color: white;
`

const ProfileMenu = () => {


    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <Container>

            <Button
                onClick={() => setMenuOpen(!menuOpen)}
                variant="contained"
                sx={{
                    position: "absolute",
                    top: 100,
                    left: 40,
                }}
            >
                <MenuOpen />
            </Button>

            {
                menuOpen ?
                    (<Box
                        sx={{
                            height: "100vh",
                            width: "200px",
                            backgroundColor: "navy",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 100,
                            display: "flex",
                            flexDirection: "column",
                            pt: 3,
                            px: 1
                        }}
                    >
                        <Button
                            onClick={() => setMenuOpen(!menuOpen)}
                            variant="contained"
                        >
                            <MenuBook />
                        </Button>

                        <MenuList sx={{ mt: 5 }}>

                            <MenuItem>
                                <MyLink onClick={() => setMenuOpen(!menuOpen)} to="/addpost">New Post</MyLink>
                            </MenuItem>

                            <MenuItem>
                                <MyLink onClick={() => setMenuOpen(!menuOpen)} to="/">Dashboard</MyLink>
                            </MenuItem>

                            <MenuItem>
                                <MyLink onClick={() => setMenuOpen(!menuOpen)} to="/chat">Chat</MyLink>
                            </MenuItem>

                        </MenuList>

                    </Box>)
                    :
                    ("")
            }

        </Container>
    )
}

export default ProfileMenu
