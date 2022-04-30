import {Routes, Route, NavLink} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import {Home} from '../pages/home'
import {AddFundraiser} from '../pages/add-fundraiser'

const activeStyle = {borderBottom: '1px solid white', borderRadius: 0}

export const AppRouter = () => {
  return (
    <>
      <Box>
        <AppBar position="relative" sx={{paddingLeft: 5, paddingRight: 5}}>
          <Toolbar>
            <Typography variant="h6" sx={{flexGrow: 1}} component="h1">
              Blockchain Fundraiser
            </Typography>
            <Button
              sx={{color: 'white'}}
              component={NavLink}
              to="/"
              style={({isActive}) => (isActive ? activeStyle : undefined)}
            >
              Home
            </Button>
            <Button
              sx={{color: 'white'}}
              component={NavLink}
              to="/add-fundraiser"
              style={({isActive}) => (isActive ? activeStyle : undefined)}
            >
              Add New
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-fundraiser" element={<AddFundraiser />} />
        </Routes>
      </Container>
    </>
  )
}
