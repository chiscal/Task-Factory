import React from 'react'
import { Box } from '@mui/material'
import { Button } from "@mui/material"
import CreateAd from './CreateAd'

const CreateBtn = ({ displayBtn, setDisplayBtn, setIsLoading, setResult, connected }) => {

    let style = {position: "fixed", bottom: "5%", right: "70px", boxShadow: "7px 7px 5px lightblue", marginBottom: "120px", zIndex: "1"}

  return (
    <Box>
        {displayBtn && <CreateAd displayBtn={displayBtn} setDisplayBtn={setDisplayBtn} setResult={setResult} setIsLoading={setIsLoading} connected={connected}/> }
        <Button 
        variant="contained"
        onClick={() => setDisplayBtn(displayBtn => !displayBtn)}
        sx={displayBtn !== true ? {backgroundColor: "blueviolet", ...style} : {backgroundColor: "red", ...style}}
        >{displayBtn === true ? "Close" : displayBtn !== true ? "Create" : ""}</Button>
    </Box>
  )
}

export default CreateBtn