import React from 'react'
import {AppRouter} from './components/app-router'

import {Contract} from './providers'

export const App = () => {
  const web3State = React.useContext(Contract)

  if (!web3State.web3) {
    return <div>Loading Web3, accounts, and contract...</div>
  }

  return <AppRouter />
}

export default App
