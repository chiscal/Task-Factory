import React from 'react'
import { Typography, Stack } from '@mui/material'
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import task from "../task.png"

const Footer = () => {
  return (
    <Stack sx={{position: "fixed", bottom: "0px", backgroundColor: "blueviolet", width: "100%", height: "20%", borderRadius: "15px 15px 0px 0px"}}>
      <Link to={"/"}>
        <img src={task} alt="task" style={{ width: '55px', height: '55px', margin: '40px 20px', borderRadius: "20px", position: "relative", left: "0px"}} />
      </Link>
      <Stack direction={"row"} gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px" position={"absolute"} right={"43%"} top={"45%"}>
        <a href="https://twitter.com/closet_nerdd" target="_blank"rel="noreferrer"><TwitterIcon /></a>
        <a href="https://github.com/chiscal" target="_blank" rel="noreferrer"><GitHubIcon /></a>
        <a href="https://www.linkedin.com/in/paschal-ekemere-114245201/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
      </Stack>
      <Typography sx={{position: "absolute" ,right: "43%", color: "black", marginBottom: "20px", top: "40%"}}>Encode X EthSafari Hackathon</Typography>
    </Stack>
  )
}

export default Footer