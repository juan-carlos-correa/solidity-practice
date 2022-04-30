import {useState, useEffect, useCallback} from 'react'

import FundraiserFactory from '../contracts/FundraiserFactory.json'
import FundraiserContract from '../contracts/Fundraiser.json'
import getWeb3 from '../getWeb3'

export const useFundraiserContract = () => {
  const [factoryFundraiser, setFactoryFundraiser] = useState({
    storageValue: 0,
    accounts: null,
    contract: null,
  })
  const [web3, setWeb3] = useState({eth: {}})
  const [isWeb3Loading, setIsWeb3Loading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const web3 = await getWeb3()

        const accounts = await web3.eth.getAccounts()

        const networkId = await web3.eth.net.getId()
        const deployedNetwork = FundraiserFactory.networks[networkId]
        const instance = new web3.eth.Contract(
          FundraiserFactory.abi,
          deployedNetwork && deployedNetwork.address,
        )

        setWeb3(web3)
        setFactoryFundraiser({
          accounts,
          contract: instance,
        })
        setIsWeb3Loading(false)
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        )
        console.error(error)
      }
    }

    load().catch(e => alert(e.message))
  }, [])

  const getFundData = useCallback(
    contractAddress =>
      new Promise(async (resolve, reject) => {
        try {
          const accounts = await web3.eth.getAccounts()

          const instance = new web3.eth.Contract(
            FundraiserContract.abi,
            contractAddress,
          )

          resolve({
            accounts,
            contract: instance,
          })
        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),
    [web3.eth],
  )

  return {factoryFundraiser, getFundData, isWeb3Loading}
}
