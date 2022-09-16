import React, { useState, useEffect} from 'react'
import { Box, Stack, Pagination, Typography } from '@mui/material'
import Auth from '../components/Auth'
import AdCard from '../components/AdCard'
import { getUserAds } from '../utils/UserBaseFunc'
import { getAdInfo } from '../utils/CreateAdFunc'
import { Hypnosis } from "react-cssfx-loading";


const MyAds = ({ connected, setConnected, setChainId, address, balance, setAddress, setBalance }) => {
  const [Ads, setAds] = useState([])
  const [loaded, setLoaded] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(6);

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    const retrieve = async() => {
      try {
        if(connected) {
          let ads = await getUserAds(address)
          ads.forEach((ad) => {
            getAdInfo(ad).then((res) => res !== undefined && setAds(prev => [...prev, res]))
            sleep(2000)
          })
          setLoaded(!loaded)
        }
      } catch(e) {
        console.error(e)
      } 
    }

    retrieve()
  }, [address])

  const indexOfLastExercise = currentPage * adsPerPage;
  const indexOfFirstExercise = indexOfLastExercise - adsPerPage;
  const currentAds = Ads.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

  };

  return (
    <Box>
      <Auth connected={connected} setConnected={setConnected} setChainId={setChainId} address={address} setAddress={setAddress} balance={balance} setBalance={setBalance}/>
      {!loaded && connected && <Hypnosis color='blueviolet' height="100px" width="100px" style={{position: "absolute", right: "50%", bottom: "40%"}}/>}
      {!Ads.length  && loaded ?  <Typography align='center' fontWeight={"bold"} sx={{fontSize: "large", position: "absolute", top: "43%", right: "41%", color: "red"}}>No Ads To Display!!!</Typography> : <Stack direction="row" sx={{ gap: { lg: '70px', xs: '50px' } }} flexWrap="wrap" justifyContent="center" height={"600px"}>
        {currentAds.map((info) => {
          return <AdCard key={info.Ad_address} info={info} />
        })}
      </Stack>}
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center" marginBottom={"70px"}>
        {Ads.length > 6 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(Ads.length / adsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            sx={{position: "absolute", top: "780px"}}
          />
        )}
      </Stack>
      {!connected && <Typography align='center' fontWeight={"bold"} sx={{fontSize: "large", position: "absolute", top: "43%", right: "41%", color: "red"}}>Connect Wallet To See Ads!!!</Typography>}
    </Box>
  )
}

export default MyAds