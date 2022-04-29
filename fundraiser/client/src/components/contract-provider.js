import React from 'react'

import {useFundraiserContract} from '../hooks/use-fundraiser-contract'
import {Contract} from '../providers'

export const ContractProvider = ({children}) => {
  const web3State = useFundraiserContract()

  return <Contract.Provider value={web3State}>{children}</Contract.Provider>
}
