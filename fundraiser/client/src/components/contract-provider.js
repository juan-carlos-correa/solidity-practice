import React from 'react'

import {useFundraiserContract} from '../hooks/use-fundraiser-contract'
import {Contract} from '../providers'

export const ContractProvider = ({children}) => {
  const {factoryFundraiser, getFundData, isWeb3Loading} =
    useFundraiserContract()

  const value = {factoryFundraiser, getFundData, isWeb3Loading}

  return <Contract.Provider value={value}>{children}</Contract.Provider>
}
