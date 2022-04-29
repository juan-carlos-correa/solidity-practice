import {Routes, Route, Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import {Home} from '../pages/home'
import {AddFundraiser} from '../pages/add-fundraiser'

export const AppRouter = () => {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Button sx={{color: 'white'}} component={Link} to="/">
              Home
            </Button>
            <Button sx={{color: 'white'}} component={Link} to="/add-fundraiser">
              Add fundraiser
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-fundraiser" element={<AddFundraiser />} />
        </Routes>
      </Container>
    </>
  )
}
