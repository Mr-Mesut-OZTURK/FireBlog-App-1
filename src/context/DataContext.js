import React, { createContext, useEffect, useState } from 'react'
import { getData } from '../helper/firebase'


export const DataContext = createContext()


const DataContextProvider = (props) => {

    const [posts, setPosts] = useState([])

 

    useEffect(() => {
        // setInterval(()=>{
            getData(setPosts)
        // }, 1000)
    }, [])
    

    return (
        <DataContext.Provider value={{posts, setPosts}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
