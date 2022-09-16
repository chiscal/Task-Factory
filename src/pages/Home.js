import React, { useState, useEffect } from 'react'
import { Hypnosis } from "react-cssfx-loading";
import { Box, Pagination, Stack, Typography } from "@mui/material"
import { getAdInfo } from '../utils/CreateAdFunc'
import { getAds } from '../utils/UserBaseFunc';
import AdCard from '../components/AdCard';

const Home = () => {
  const [Ads, setAds] = useState([])
  const [loaded, setLoaded] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(6);

  useEffect(() => {
    const fetch_ads = async() => {
      let ads = await getAds()
      ads.forEach((ad) => {
        sleep(2000)
        getAdInfo(ad).then((info) => info !== undefined && setAds(prev => [...prev, info]))
      })
      setLoaded(!loaded)
    }
    fetch_ads()
  }, [])
    
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const indexOfLastExercise = currentPage * adsPerPage;
  const indexOfFirstExercise = indexOfLastExercise - adsPerPage;
  const currentAds = Ads.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };


  return (
    <Box>
      {!loaded && <Hypnosis color='blueviolet' height="100px" width="100px" style={{position: "absolute", right: "50%", bottom: "40%"}}/>}
      {!Ads.length  && loaded ? <Typography align='center' fontWeight={"bold"} sx={{fontSize: "large", position: "absolute", top: "43%", right: "41%", color: "red"}}>No Ads To Display!!!</Typography> : <Stack direction="row" sx={{ gap: { lg: '70px', xs: '50px' } }} flexWrap="wrap" justifyContent="center" height={"600px"}>
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
            sx={{position: "absolute", top: "85%"}}
          />
        )}
      </Stack>
    </Box>
  )
}

export default Home