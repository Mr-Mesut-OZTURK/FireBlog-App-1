import React, { createContext, useEffect, useState } from 'react'
import { getChat } from '../helper/firebase'


export const ChatContext = createContext()


const ChatContextProvider = (props) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        setInterval(()=>{
            getChat(setMessages)
            // console.log(messages)
        }, 2000)
    }, [])
    
    // console.log(data)

    return (
        <ChatContext.Provider value={{messages, setMessages}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider