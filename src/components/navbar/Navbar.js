import "./Navbar.css"
import React, { useEffect, useState, useContext } from 'react'
import navImg from "../../assets/clarusway.png"
import { Link } from "react-router-dom"
import { auth, logout } from "../../helper/firebase"
import { AuthContext } from "../../context/AuthContext"
import { Button, Typography } from "@mui/material"



const Navbar = () => {

    const user = useContext(AuthContext)

    const [menuActive, setMenuActive] = useState(false)

    return (
        <nav>

            <Link to="/" className="img_container">
                <img src={navImg} alt="clarusway" />
            </Link>

            <h2>
                <span className="nav_line" />
                <span className="nav_title-1">{" < ed8en / > "}</span>
                <span className="nav_title-2"> Blog </span>
                <span className="nav_line" />
            </h2>



            {
                auth.currentUser ?
                    (<Button
                        onClick={() => setMenuActive(!menuActive)}
                        sx={{
                            minWidth: "fit-content",
                            bgcolor: "white",
                            p: "5px",
                            borderRadius: "5px",
                            boxShadow: "2px 2px 10px 0 black"
                        }}
                    >
                        {auth.currentUser.email.slice(0,10) + ".."}
                    </Button>)
                    :
                    (
                        <div
                            onClick={() => setMenuActive(!menuActive)}
                            className="icon_container"
                        >
                            <span className="fas fa-user"></span>
                        </div>
                    )
            }

            {
                menuActive ?
                    (<menu>
                        {

                            user.userInfo ?
                                <>
                                    <Link
                                        className="menu__link"
                                        to="/profile"
                                        onClick={() => setMenuActive(!menuActive)}
                                    >
                                        Profile
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => { logout(); setMenuActive(!menuActive);window.location.reload(true) }}
                                    >
                                        Log out
                                    </Button>

                                </>
                                :
                                <>
                                    <Link
                                        className="menu__link"
                                        to="/login"
                                        onClick={() => setMenuActive(!menuActive)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        className="menu__link"
                                        to="/register"
                                        onClick={() => setMenuActive(!menuActive)}
                                    >
                                        Register
                                    </Link>
                                </>
                        }
                    </menu>)
                    :
                    ""
            }


        </nav>
    )
}

export default Navbar
