import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

import {Contract} from '../providers'

export const FundCard = ({fundAddress}) => {
  const [fundData, setFundData] = React.useState({
    name: '',
    website: '',
    imageUrl: '',
    description: '',
    totalDonations: 0,
  })

  const {getFundData} = React.useContext(Contract)

  const loadFundData = React.useCallback(async () => {
    const {contract} = await getFundData(fundAddress)

    const name = await contract.methods.name().call()
    const website = await contract.methods.website().call()
    const imageUrl = await contract.methods.imageUrl().call()
    const description = await contract.methods.description().call()
    const totalDonations = await contract.methods.totalDonations().call()

    setFundData({name, website, imageUrl, description, totalDonations})
  }, [getFundData, fundAddress])

  React.useEffect(() => {
    loadFundData()
  }, [loadFundData])

  return (
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
          Total: {fundData.totalDonations}
        </Typography>

        <Typography sx={{mb: 1.5}} variant="body2" color="text.secondary">
          {fundData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          target="_blank"
          size="small"
          component="a"
          href={fundData.website}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
