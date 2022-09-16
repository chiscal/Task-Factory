import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom';
import task from "../task.png"

const NavBar = () => {
  return (
    <Stack direction={"row"} spacing={2} sx={{marginTop: "10px", border: "2px", justifyContent: "center"}}>
      <Link to={"/"}>
        <img src={task} alt="task" style={{ width: '55px', height: '55px', margin: '0px 20px', borderRadius: "20px", position: "absolute", left: "0px"}} />
      </Link>
      <Link to={"/"} style={{textDecoration: "none"}}>
        Home
      </Link>
      <Link to={"/MyAds"} style={{textDecoration: "none"}} >
        My Ads
      </Link>
    </Stack>
  )
}

export default NavBar