import React, { useState } from 'react'
import { Box, Button, Typography } from "@mui/material"
import { emptyCache } from '../utils/UserBaseFunc'

const PopUp = ({ result, setResult }) => {
    const [disPop, setDisPop] = useState(true)

    let style = {border: "2px solid", borderRadius: "5px", width: "80px", position: "absolute", bottom: "40%", right: "38%", textAlign: "center"}

    if (disPop) {
        return (
            <Box sx={{width: 300, height: 300, backgroundColor: "#E6E6FA", position: "fixed", top: "30%", right: "40%", border: "solid 3px", borderRadius:"10px", zIndex: "2"}}>
                {result && <Typography sx={result === "SUCCESS" ? {color: "green", ...style} : {color: "red", ...style}}>{result}</Typography>}
                <Button onClick={(disPop) => {
                    setDisPop(!disPop)
                    setResult("")
                    emptyCache()
                }} sx={{backgroundColor: "red", position: "absolute", bottom: "5%", margin: "0px 37%"}}>Close</Button>
            </Box>
            )
    }
}

export default PopUp