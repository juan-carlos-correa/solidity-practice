import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App'
import {ContractProvider} from './components/contract-provider'
import {GlobalSnackbarProvider} from './components/global-snackbar-provider'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalSnackbarProvider>
      <ContractProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContractProvider>
    </GlobalSnackbarProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
