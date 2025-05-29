import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GeolocationContextProvider } from './context/GeolocationContext.tsx'
import { LoginContextProvider } from './context/LoginContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginContextProvider>
      <GeolocationContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeolocationContextProvider>
    </LoginContextProvider>
  </StrictMode>,
)
