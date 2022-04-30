import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import {Contract} from '../../providers'
import {FundCard} from '../../components/fund-card'

export const Home = () => {
  const [funds, setFunds] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const {factoryFundraiser} = React.useContext(Contract)

  const loadFundraisersList = React.useCallback(async () => {
    try {
      const contractFunds = await factoryFundraiser.contract.methods
        .fundraisers(10, 0)
        .call()
      setFunds(contractFunds)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [factoryFundraiser.contract.methods])

  React.useEffect(() => {
    loadFundraisersList()
  }, [loadFundraisersList])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <Typography sx={{mt: 3}} variant="h4" component="h1">
        Available Funds
      </Typography>
      <Grid container sx={{mt: 3}}>
        {funds.map(fundAddress => (
          <Grid item key={fundAddress}>
            <FundCard fundAddress={fundAddress} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
