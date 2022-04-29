import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const AddFundraiser = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{mt: 3}}>
        <Typography align="center" component="h1" variant="h5">
          Add a new Fundraiser
        </Typography>
      </Box>
      <Box component="form" noValidate sx={{mt: 3, mb: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="name" fullWidth label="Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Website url" name="websiteUrl" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Image Url" name="imageUrl" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="description" label="Description" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="custodian" label="Custodian address" />
          </Grid>
        </Grid>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
