import { useContext } from 'react'
import './style.scss'

import { api } from '../../services/api'

import { UserContext } from '../../contexts/UsersContext'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function UserList() {
  const {users, getUsers, setUser, isEditing, setIsEditing } = useContext(UserContext)

  async function updateUser(user){
    setIsEditing(true)
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age
    })
  }

  async function deleteUser(id){
    await api.delete(`/usuarios/${id}`)
    toast.warning('Usuário deletado com sucesso')
    getUsers()
  }

  return (
    <>
      {users !== '' && 
        users.map((user) => (
          <div className='card' key={user.id}>
            <div  key={user.id}>
              <p>Nome: <span>{user.name}</span> </p>
              <p>Idade: <span>{user.age}</span> </p>
              <p>E-mail: <span>{user.email}</span> </p>
            </div>
            <div>
              <button onClick={() => updateUser(user)}>
                <FaEdit size={20} color='red' />
              </button>
              <button onClick={() => deleteUser(user.id)} >
                <FaTrashAlt size={20} color='red' />
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}
