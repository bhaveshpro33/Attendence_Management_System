import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AttendanceSystem from './Pages/Login/Login_Page.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AttendanceSystem/>
  </StrictMode>,
)
