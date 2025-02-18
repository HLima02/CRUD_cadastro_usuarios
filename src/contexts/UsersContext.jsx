import { useState, useEffect, createContext } from 'react'

import { api } from '../services/api'

export const UserContext = createContext({})

export default function UserProvider({children}) {
  const [users, setUSers] = useState([])
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  async function getUsers(){
    await api.get('/usuarios')
    .then((res) => {
      setUSers(res.data)
    })
    .catch((error) => {
      console.log({error})
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  
  return (
    <UserContext.Provider value={{
      users, 
      setUSers,
      user,
      setUser,
      getUsers,
      isEditing,
      setIsEditing
      }}>
      {children}
    </UserContext.Provider>
  )
}
