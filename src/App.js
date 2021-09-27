import "./App.css"
import React from 'react'
import AppRouter from './router/AppRouter'
import AuthContextProvider from "./context/AuthContext"
import DataContextProvider from "./context/DataContext"
import ChatContextProvider from "./context/ChatContext"

const App = () => {
    return (
        <AuthContextProvider>
            <DataContextProvider>
                <ChatContextProvider>

                    <AppRouter />

                </ChatContextProvider>
            </DataContextProvider>
        </AuthContextProvider>
    )
}

export default App
