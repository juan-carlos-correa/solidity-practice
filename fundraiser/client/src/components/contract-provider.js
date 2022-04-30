import React from 'react'

import {useFundraiserContract} from '../hooks/use-fundraiser-contract'
import {Contract} from '../providers'

export const ContractProvider = ({children}) => {
  const {factoryFundraiser, getFundData, isWeb3Loading, web3} =
    useFundraiserContract()

  const value = {factoryFundraiser, getFundData, isWeb3Loading, web3}

  return <Contract.Provider value={value}>{children}</Contract.Provider>
}
