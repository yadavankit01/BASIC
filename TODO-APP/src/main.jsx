import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Todocontextprovider from './Context/Todocontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Todocontextprovider>
    <App />
   </Todocontextprovider>
  </StrictMode>,
)
