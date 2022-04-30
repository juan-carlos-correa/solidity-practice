import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'

import {SnackbarContext} from '../providers'

export const GlobalSnackbarProvider = ({children}) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = () => {
    setIsSnackbarOpen(false)
    setMessage('')
  }

  const openSnackbar = message => {
    setIsSnackbarOpen(true)
    setMessage(message)
  }

  const value = {
    openSnackbar,
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </SnackbarContext.Provider>
  )
}
