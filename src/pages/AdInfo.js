import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography, Button } from '@mui/material'
import { getAdInfo, clicks, click, owner, deleteAd } from '../utils/CreateAdFunc';
import { Hypnosis } from "react-cssfx-loading";
import locked from "../strongbox.png"
import cpc from "../money.png"
import balance from "../coins.png"
import clickIcon from "../click.png"

const AdInfo = ({ userAddress }) => {
  const [info, setInfo] = useState("")
  const [userClicks, setUserClicks] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const { address } = useParams();

  useEffect(() => {
    const fetch_info = async() => {
      let info = await getAdInfo(address)
      let click_val = await clicks(address)
      let ownerAd = await owner(address)
      setInfo(info)
      setUserClicks(click_val)
      setOwnerAddress(ownerAd)
    }
    fetch_info()
  }, [address])

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  if (!info && !ownerAddress) {
    return <Hypnosis color='blueviolet' height="100px" width="100px" style={{position: "absolute", right: "50%", bottom: "40%"}}/>
  } else {
      return (
        <Box>
          <Stack spacing={2} direction="row">
            <img src={info.image} alt={info.name} style={{width: "500px", height: "250px", marginLeft: "68px", marginTop: "25px", borderRadius: "13px"}}/>
            <Stack spacing={5} sx={{position: "absolute", left: "85%", marginTop: "50px"}}>
              <Stack spacing={2} direction="row">
                <img src={cpc} alt="cpc" style={{width: "50px", height: "50px"}}/>
                <Typography sx={{fontSize: "25px"}}>{info.cpc.toString() / (10 ** 18)} ETH</Typography>
              </Stack>
              <Stack spacing={2} direction="row">
                <img src={locked} alt="locked" style={{width: "50px", height: "50px"}}/>
                <Typography sx={{fontSize: "25px"}}>{info.eth_locked.toString() / (10 ** 18)}ETH</Typography>
              </Stack>
              <Stack spacing={2} direction="row">
                <img src={balance} alt="balance" style={{width: "50px", height: "50px"}}/>
                <Typography sx={{fontSize: "25px"}}>{info.Eth_Balance.toString() / (10 ** 18)} ETH</Typography>
              </Stack>
              {userAddress === ownerAddress.toLocaleLowerCase() && <Stack spacing={2} direction="row">
                <img src={clickIcon} alt="clickIcon" style={{width: "50px", height: "50px"}}/>
                <Typography sx={{fontSize: "25px"}}>{userClicks} clicks</Typography>
              </Stack>}
            </Stack>
          </Stack>
          <Typography textTransform="capitalize" sx={{fontWeight: "bold", fontSize: "40px", marginLeft: "68px", marginBottom: "20px", marginTop: "10px"}}>{info.name}</Typography>
          <Typography sx={{fontSize: "20px", marginLeft: "68px", marginBottom: "20px", marginRight: "68px", lineBreak: "anywhere"}}>{info.description}</Typography>
          <Button onClick={()=> click(address)} variant='contained' sx={{backgroundColor: "blueviolet", marginLeft: "68px"}}><a href={info.URL.slice(0, 8) !== "https://" ? `https://${info.URL}` : info.URL} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>VISIT</a></Button>
          {ownerAddress.toLocaleLowerCase() === userAddress && <Button onClick={() => {
            deleteAd(address).then(() => sleep(8000).then(() =>  window.location = "/"))
          }} variant='contained' sx={{backgroundColor: "red", marginLeft: "68px"}} >Delete Ad</Button>}
        </Box>
      )
    } 
}


export default AdInfo