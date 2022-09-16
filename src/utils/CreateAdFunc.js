import { ethers } from "ethers"
import createAdabi from "../ABI/CreateAd.json"

let url = process.env.REACT_APP_ALCHEMY_URL

const provider = new ethers.providers.JsonRpcProvider(url, {
    name: "Alchemy - Goerli",
    chainId: 5,
});

export const getAdInfo = async(contract_address) => {
    let result
    try {
        let interactor = new ethers.Contract(contract_address, createAdabi, provider)
        let values = await interactor.getAdInfo()
        let eth_left = await interactor.ethLeft()
        result = {name: values[0], URL: values[1], description: values[2], image: values[3], cpc: values[4], eth_locked: values[5], Ad_address: values[6], Matic_Balance: values[7], Eth_Balance: eth_left}
    } catch {
        result = undefined;
    }
    return result
}

export const click = async(contract_address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner()
    const { chainId } = await provider.getNetwork()

    let domainData = {
        name: "TASK FACTORY",
        version: "1",
        verifyingContract: contract_address,
        chainId: chainId
    }
    let types = {
        setBook : [
            {name:  "_addr", type: "address"},
        ]
    }
    let values = {_addr : "0x22Ece602776DE74e1734f05b05068Be3B0EB4482"}

    let signature = await signer._signTypedData(domainData, types, values)
    let signer_addr = await signer.getAddress()

    let interactor = new ethers.Contract(contract_address, createAdabi, signer)
    await interactor.click(signer_addr, signature)
}

export const deleteAd = async(contract_address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner()
    let interactor = new ethers.Contract(contract_address, createAdabi, signer)
    await interactor.deleteAd()
}

export const clicks = async(contract_address) => {
    let interactor = new ethers.Contract(contract_address, createAdabi, provider)
    let num_of_clicks = await interactor.clicks()
    return num_of_clicks.toString()
}

export const owner = async(contract_address) => {
    let interactor = new ethers.Contract(contract_address, createAdabi, provider)
    let owner_address = await interactor.owner()
    return owner_address
}