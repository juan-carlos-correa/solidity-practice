import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import cc from 'cryptocompare'

import {Contract, SnackbarContext} from '../providers'
import {FundraiserDialog} from './fundraiser-dialog'

export const FundCard = ({fundAddress}) => {
  const [fundData, setFundData] = React.useState({
    name: '',
    website: '',
    imageUrl: '',
    description: '',
    totalDonations: 0,
  })
  const [fundRaiserContract, setFundRaiserContract] = React.useState({
    contract: null,
    accounts: [],
  })
  const [usdDonationAmount, setUsdDonationAmount] = React.useState(0)

  const {openSnackbar} = React.useContext(SnackbarContext)

  const {getFundData, web3} = React.useContext(Contract)

  const loadFundData = React.useCallback(async () => {
    const {contract, accounts} = await getFundData(fundAddress)

    const name = await contract.methods.name().call()
    const website = await contract.methods.website().call()
    const imageUrl = await contract.methods.imageUrl().call()
    const description = await contract.methods.description().call()
    const totalDonations = await contract.methods.totalDonations().call()

    if (totalDonations) {
      const exchangeRateEthUsd = await cc.price('ETH', ['USD'])
      const eth = web3.utils.fromWei(totalDonations, 'ether')
      const usdDonationAmount = exchangeRateEthUsd.USD * eth
      setUsdDonationAmount(usdDonationAmount)
    }

    setFundData({name, website, imageUrl, description, totalDonations})
    setFundRaiserContract({contract, accounts})
  }, [getFundData, fundAddress, web3.utils])

  const handleDonate = async donationAmount => {
    try {
      await fundRaiserContract.contract.methods.donate().send({
        from: fundRaiserContract.accounts[0],
        value: donationAmount,
        gas: 650000,
      })

      openSnackbar('Donation successfully!')
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    loadFundData()
  }, [loadFundData])

  return (
    <>
      <Card sx={{maxWidth: 345}}>
        <CardMedia
          component="img"
          height="194"
          image={fundData.imageUrl}
          alt={fundData.name}
        />
        <CardContent>
          <Typography sx={{fontSize: 18}} color="text.secondary" gutterBottom>
            {fundData.name}
          </Typography>

          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            Total donated: {parseFloat(usdDonationAmount).toFixed(2)} USD.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            target="_blank"
            size="small"
            component="a"
            href={fundData.website}
            sx={{marginRight: 2}}
          >
            Visit website
          </Button>
          <FundraiserDialog
            name={fundData.name}
            description={fundData.description}
            imageUrl={fundData.imageUrl}
            handleDonate={handleDonate}
          />
        </CardActions>
      </Card>
    </>
  )
}
