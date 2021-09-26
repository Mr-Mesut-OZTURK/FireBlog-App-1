import "./App.css"
import React from 'react'
import AppRouter from './router/AppRouter'
import AuthContextProvider from "./context/AuthContext"
import DataContextProvider from "./context/DataContext"

const App = () => {
    return (
        <AuthContextProvider>
            <DataContextProvider>

                <AppRouter />

            </DataContextProvider>
        </AuthContextProvider>
    )
}

export default App
