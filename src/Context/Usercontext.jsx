import React, {  createContext,  useState } from 'react'
export let userContext = createContext()

export default function Usercontext({ children }) {
  //for get data from local storg or make empty []
  const [items, setitem] = useState(localStorage.getItem("items")== null ? [] : JSON.parse(localStorage.getItem("items")))
  //for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <>
      <userContext.Provider  value={{ items, setitem, isDarkMode, setIsDarkMode}}>

        {children}

  
      </userContext.Provider>
    </>
  )
}
