import { useContext, useState, useEffect } from 'react'
import './style.scss'

import { api } from '../../services/api'
import { UserContext } from '../../contexts/UsersContext'

import { toast } from 'react-toastify';

export default function FormComponent() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')

  const {isEditing, setIsEditing, user, setUser, getUsers} = useContext(UserContext)

  async function handleSigUp(e) {
    e.preventDefault()
    if(name !== '' && age !== '' && email !== ''){
      if(!isEditing){
        await api.post('/usuarios',{
          email,
          name,
          age
        })
        .then(() => {
          toast.success('Usuário cadastrado com sucesso')
          setEmail('')
          setName('')
          setAge('')
          getUsers()
        })
        .catch((error) => {
          console.log(`Erro na requisição ${error}`)
        })
      } else {
        await api.put(`/usuarios/${user.id}`, {
          email,
          name,
          age
        })
        .then(() => {
          toast.success('Usuário Atualizado com sucesso')
          setIsEditing(false)
          setEmail('')
          setName('')
          setAge('')
          getUsers()
        })
        .catch((error) => { console.log('error')})
      }
    } else {
      toast.warning('Preencha todos os campos')
    }
    
  }

  useEffect(() => {
    function chargeUserInfos(){
      if(isEditing && user !== ''){
        setName(user.name)
        setEmail(user.email)
        setAge(user.age)
      }
    }
    chargeUserInfos()
    
  }, [isEditing, user])
  
  return (
    <form onSubmit={handleSigUp}>
      <h1>Cadastro de usuários</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Nome' />
      <input value={age} onChange={(e) => setAge(e.target.value)} type="text" placeholder='Idade' />
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail' />
      <button type="submit">{ isEditing ? 'Atualizar' : 'Cadastrar' }</button>
    </form>
  )
}
