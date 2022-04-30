import React from 'react'
import {AppRouter} from './components/app-router'

import {Contract} from './providers'

export const App = () => {
  const {isWeb3Loading} = React.useContext(Contract)

  if (isWeb3Loading) {
    return <div>Loading Web3, accounts, and contract...</div>
  }

  return <AppRouter />
}

export default App
