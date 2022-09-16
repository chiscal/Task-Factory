import React from 'react'
import { Box, Typography, Button} from "@mui/material"

const AccountInfo = ({ address, balance }) => {
    
  return (
    <Box mt={9}>
        <Typography 
        fontSize={20} 
        fontWeight={700} 
        sx={{marginTop: "2px", marginBottom: "2px", marginLeft: "2px", marginRight: "2px"}}
        ><Button variant='contained' sx={{marginTop: "3px", marginBottom: "3px", marginLeft: "3px", backgroundColor: "blueviolet", cursor: "pointer"}}>Address</Button> {address}</Typography>
        <Typography 
        fontSize={20} 
        fontWeight={700}sx={{marginTop: "2px", marginBottom: "2px", marginLeft: "2px", marginRight: "2px"}}
        ><Button variant='contained' sx={{marginTop: "3px", marginBottom: "3px", marginLeft: "3px", backgroundColor: "blueviolet", cursor: "pointer"}}>Balance</Button> {balance}</Typography>
    </Box>
  )
}

export default AccountInfo