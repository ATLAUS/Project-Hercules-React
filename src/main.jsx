import './index.scss'
import React from 'react'
import { App } from './App.jsx'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-oejn7owe38tonqgg.us.auth0.com"
      clientId="mIROpMCBxC8SkKlSJ35F1lJqqCOrYj7u"
      authorizationParams={{
        redirect_uri:
          import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/home',
        audience: import.meta.env.VITE_AUDIENCE || 'http://localhost:3001'
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
