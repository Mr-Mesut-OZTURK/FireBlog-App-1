import React, { useState, useEffect, createContext } from 'react'
import { loginControl } from '../helper/firebase'


export const AuthContext = createContext()


const AuthContextProvider = (props) => {

    const [userInfo, setUserInfo] = useState(null)
    const [pending, setPending] = useState(true);


    useEffect(() => {
        const login = loginControl(setUserInfo, setPending)
        return login
    }, [])


    if (pending) {
        // console.log("pending");
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2em",
            }}>
                Loading...
            </div>
        )
    }

    return (

        <AuthContext.Provider value={{ userInfo }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
