import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

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
  const {openSnackbar} = React.useContext(SnackbarContext)

  const {getFundData} = React.useContext(Contract)

  const loadFundData = React.useCallback(async () => {
    const {contract, accounts} = await getFundData(fundAddress)

    const name = await contract.methods.name().call()
    const website = await contract.methods.website().call()
    const imageUrl = await contract.methods.imageUrl().call()
    const description = await contract.methods.description().call()
    const totalDonations = await contract.methods.totalDonations().call()

    setFundData({name, website, imageUrl, description, totalDonations})
    setFundRaiserContract({contract, accounts})
  }, [getFundData, fundAddress])

  const handleDonate = async usdAmount => {
    try {
      const result = await fundRaiserContract.contract.methods.donate().send({
        from: fundRaiserContract.accounts[0],
        value: usdAmount,
        gas: 650000,
      })
      console.log(result)
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
            Total donated: {fundData.totalDonations}
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
            handleDonate={handleDonate}
          />
        </CardActions>
      </Card>
    </>
  )
}
