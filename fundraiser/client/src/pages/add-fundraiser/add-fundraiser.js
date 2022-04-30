import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'

import {Contract, SnackbarContext} from '../../providers'
import {PageTitle} from '../../styled'

export const AddFundraiser = () => {
  const {factoryFundraiser} = React.useContext(Contract)
  const {openSnackbar} = React.useContext(SnackbarContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const {name, websiteUrl, imageUrl, description, beneficiary} =
      e.target.elements

    try {
      await factoryFundraiser.contract.methods
        .createFundraiser(
          name.value,
          websiteUrl.value,
          imageUrl.value,
          description.value,
          beneficiary.value,
        )
        .send({from: factoryFundraiser.accounts[0]})
      openSnackbar('The fundraiser was created succesfully!')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <PageTitle component="h1">Add a new Fundraiser</PageTitle>
      <Typography variant="subtitle1">
        Create a new fundraiser request.
      </Typography>
      <Typography variant="subtitle1">
        Fill the fields with the properly information
      </Typography>
      <Container maxWidth="md">
        <Box component="form" noValidate sx={{mt: 5}} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="name" fullWidth label="Name of the project" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website url of the project"
                name="websiteUrl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image url of the project"
                name="imageUrl"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="beneficiary"
                label="Beneficiary address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Description and Why someone should donate?"
              />
            </Grid>
          </Grid>
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
