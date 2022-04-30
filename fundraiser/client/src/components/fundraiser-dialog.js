import {useState, useContext} from 'react'
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

import {Contract} from '../providers'

export const FundraiserDialog = ({name, description, handleDonate}) => {
  const [open, setOpen] = useState(false)
  const [calculatedWei, setCalculatedWei] = useState(0)

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
    handleDonate(usdAmount.value)
  }

  const handleInputChange = e => {
    const {value} = e.target

    if (!value) {
      return
    }

    const wei = web3.utils.toWei(value)
    setCalculatedWei(wei)
  }

  return (
    <>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Learn more
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
              <InputLabel htmlFor="standard-adornment-amount">
                US dollar Amount
              </InputLabel>
              <Input
                defaultValue={0}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={handleInputChange}
                type="number"
                name="usdAmount"
              />
              <FormHelperText>Aprox wei value: {calculatedWei}</FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="donation-form" onClick={handleClose}>
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
