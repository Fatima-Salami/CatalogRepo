import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorProvider } from './providers/ErrorContext.jsx'
import { RequestsProvider } from './providers/RequestsContext'
//import './styles/globals.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ErrorProvider>
      <RequestsProvider>
    <App />
    </RequestsProvider>
    </ErrorProvider>
  </StrictMode>,
)
