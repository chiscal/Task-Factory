import React from 'react'
import { Box , Button } from '@mui/material';
import AccountInfo from './AccountInfo';
import { ethers } from "ethers"
import { emptyCache } from '../utils/UserBaseFunc';

const Auth = ({ connected, setConnected, setChainId, address, balance, setAddress, setBalance }) => {


    const connectWalletHandler = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let accts = await provider.send("eth_requestAccounts", []);
        let bal = await provider.getBalance(accts[0])
        let value = parseFloat(ethers.utils.formatEther(bal))
        setAddress(accts[0])
        setBalance(`${value.toFixed(4)} ETH`)
        setConnected(!connected)
        let { chainId } = await provider.getNetwork()
        setChainId(chainId)
    }

    const disconnectWalletHandler = async () => {
        setAddress("")
        setBalance("")
        setConnected(!connected)

        emptyCache()
    }

    const handleChainChange = async() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      let { chainId } = await provider.getNetwork()
      setChainId(chainId)
    }

    const handleAcctChange = () => {
      window.location.reload(true);
    }

    window.ethereum.on("accountsChanged", handleAcctChange)
    window.ethereum.on("chainChanged", handleChainChange)

  return (
    <Box>
        <Button variant='outlined' onClick={connected !== true ? connectWalletHandler : disconnectWalletHandler} sx={{color: "blueviolet", float: "right", marginRight: "3px", marginTop: "3px"}}>{connected !== true ? "Connect" : connected ? "Disconnect" : "Disconnect"}</Button>
        <AccountInfo address={address} balance={balance} />
    </Box>
  )
}

export default Auth