import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'

import {Contract} from '../../providers'
import {FundCard} from '../../components/fund-card'
import {PageTitle} from '../../styled'

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
      <PageTitle component="h1">Fundraiser oportunities</PageTitle>

      <Typography variant="subtitle1" component="h2">
        Know the projects that seek fundraising or create a new one.
      </Typography>
      <Typography variant="subtitle1" component="h2">
        Choose one and follow the instructions.
      </Typography>

      {!funds.length && (
        <Box
          sx={{
            minWidth: '100%',
            minHeight: 'calc(100vh - 300px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="p">
            There are not funds.
          </Typography>
          <Typography variant="subtitle1" component="p">
            Start creating a new one.
          </Typography>
          <Button
            sx={{mt: 2}}
            variant="contained"
            component={Link}
            to="/add-fundraiser"
          >
            Add new
          </Button>
        </Box>
      )}

      <Grid container sx={{my: 4}} spacing={2}>
        {funds.map(fundAddress => (
          <Grid item key={fundAddress}>
            <FundCard fundAddress={fundAddress} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
