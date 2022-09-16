import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { Box } from '@mui/material';
import Home from './pages/Home'
import MyAds from './pages/MyAds'
import AdInfo from './pages/AdInfo'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ChainChange from './components/ChainChange';
import CreateBtn from './components/CreateBtn';
import { Hypnosis } from "react-cssfx-loading";
import PopUp from './components/PopUp';


const App = () => {
  let [result, setResult] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let [connected, setConnected] = useState(false)
  let [chainId, setChainId] = useState(5)
  let [displayBtn, setDisplayBtn] = useState(false)
  let [address, setAddress] = useState("")
  let [balance ,setBalance] = useState("")

  return (
    <Box>
      <NavBar />
      {chainId !== 5 && <ChainChange />}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/MyAds' element={<MyAds connected={connected} setConnected={setConnected} setChainId={setChainId} address={address} setAddress={setAddress} balance={balance} setBalance={setBalance} />} />
          <Route path='/AdInfo/:address' element={<AdInfo userAddress={address} />} />
      </Routes>

      <div>
        <CreateBtn displayBtn={displayBtn} setDisplayBtn={setDisplayBtn} setResult={setResult} setIsLoading={setIsLoading} connected={connected}/>
        {!displayBtn && !isLoading && result !== "" && <PopUp result={result} setResult={setResult} />}
        {isLoading && !displayBtn && <Hypnosis color='blueviolet' height="100px" width="100px" style={{position: "absolute", right: "50%", bottom: "40%"}}/>}
        <Footer />
      </div>
    </Box>
  )
}

export default App