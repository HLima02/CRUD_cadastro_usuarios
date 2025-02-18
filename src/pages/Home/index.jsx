import { useContext, useState } from 'react'
import './style.scss'

import FormComponent from '../../components/formComponent'
import UserList from '../../components/UsersList'

export default function Home() {
  return (
    <div className='container'>
      <FormComponent />
      <UserList />
    </div>
  )
}
