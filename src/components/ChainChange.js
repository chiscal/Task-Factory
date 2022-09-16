import React from 'react'
import { Box, Typography } from '@mui/material'

const ChainChange = () => {
  return (
    <Box sx={{position: "absolute", top: "65px", border: "3px solid blue", width: "100%", borderRadius: "5px 15px", textAlign: "center"}}>
        <Typography
        fontSize={20} 
        fontWeight={700}sx={{marginTop: "2px", marginBottom: "2px", marginLeft: "2px", marginRight: "2px"}}
        >This Demo is only available on Ethereum Testnet, Switch chains or Switch accounts...</Typography>
    </Box>
  )
}

export default ChainChange