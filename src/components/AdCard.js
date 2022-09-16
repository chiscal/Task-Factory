import React from 'react'
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material'

const AdCard = ({info}) => {
  return (
    <Link to={`/AdInfo/${info.Ad_address}`} style={{textDecoration: "none"}}>
      <Stack sx={{border: "solid 2px blueviolet", borderRadius: "10px"}} alignContent={"center"} mt={"10px"} width="400px" height={"200px"}>
        <img src={info.image} alt={info.name} loading="lazy" style={{width: "100%", height: "100px", borderRadius: "10px"}}/>
        <Typography marginLeft={"3px"} fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">{info.name}</Typography>
        <Typography marginLeft={"3px"}>{info.description.length > 40 ? `${info.description.slice(0, 41)}...` : info.description}</Typography>
      </Stack>
    </Link>
  )
}

export default AdCard