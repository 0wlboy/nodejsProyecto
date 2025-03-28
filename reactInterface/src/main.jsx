import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GetUser } from './components/GetUser'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GetUser></GetUser>
  </StrictMode>,
)
