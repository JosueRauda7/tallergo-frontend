import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GeolocationContextProvider } from './context/GeolocationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeolocationContextProvider>
      <App />
    </GeolocationContextProvider>
  </StrictMode>,
)
