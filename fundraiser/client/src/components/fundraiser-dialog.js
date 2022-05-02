import {useContext, useEffect, useState} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import cc from 'cryptocompare'

import {Contract} from '../providers'

export const FundraiserDialog = ({
  name,
  description,
  handleDonate,
  myDonations,
}) => {
  const [open, setOpen] = useState(false)
  const [exchangeRateEthUsd, setExchangeRateEthUsd] = useState(0)

  const {web3} = useContext(Contract)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const {usdAmount} = e.target.elements

    if (!usdAmount.value) {
      return
    }

    const ethAmount = usdAmount.value / exchangeRateEthUsd

    const donationAmount = web3.utils.toWei(ethAmount.toString())

    handleDonate(donationAmount)
  }

  useEffect(() => {
    const getRate = async () => {
      const exchangeRateEth = await cc.price('ETH', ['USD'])
      setExchangeRateEthUsd(exchangeRateEth.USD)
    }

    getRate()
  }, [])

  const renderMyDonationsList = () => {
    const donationList = []

    for (let i = 0; i < myDonations.values.length; i++) {
      const weiAmount = myDonations.values[i]
      const ethAmount = web3.utils.fromWei(weiAmount)
      const userDonation = exchangeRateEthUsd * ethAmount
      const donationDate = myDonations.dates[i]
      donationList.push({
        donationAmount: userDonation.toFixed(2),
        date: donationDate,
      })
    }

    return donationList.map(({donationAmount, date}) => (
      <div key={date}>
        <Typography variant="caption">{donationAmount}</Typography>
      </div>
    ))
  }

  return (
    <>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Donate
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Donate to {name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <Box
            component="form"
            id="donation-form"
            sx={{mt: 4}}
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth sx={{m: 1}} variant="standard">
              <InputLabel>USD Amount to donate</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                type="number"
                name="usdAmount"
                inputProps={{min: '0', step: '0.01'}}
              />
              <FormHelperText>
                Current ETH exchange rate: {exchangeRateEthUsd} USD. Validate it
                on metamask
              </FormHelperText>
            </FormControl>
          </Box>
          <Divider sx={{mt: 3, mb: 3}} />
          {myDonations.values.length && (
            <>
              <Typography varaint="h5" component="p">
                My donations
              </Typography>
              {renderMyDonationsList()}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="donation-form">
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
