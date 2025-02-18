import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

import UserProvider from './contexts/UsersContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
      <ToastContainer autoClose={1500} />
    </UserProvider>
  </StrictMode>,
)
