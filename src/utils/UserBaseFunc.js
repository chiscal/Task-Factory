import { ethers } from "ethers"
import userBaseAbi from "../ABI/UserBase.json"

const contract_address = "0x8c62b7B639C8577B6C4CFfa8CdC5961f792e14B4";
let url = process.env.REACT_APP_ALCHEMY_URL

const provider = new ethers.providers.JsonRpcProvider(url, {
    name: "Alchemy - Goerli",
    chainId: 5,
});

export const createAd = async(name_, link, desc, image, cpc, tokens, matic) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner()
    let user_contract = new ethers.Contract(contract_address, userBaseAbi, signer)
    let locked = parseFloat(tokens)
    let fees = parseFloat(matic)
    let fin_val = locked + fees
    console.log(fin_val.toString())
    let created_address = await user_contract.createAd(name_, link, desc, image, ethers.utils.parseEther(cpc), {value: ethers.utils.parseEther(fin_val.toString())})
    let stat = (await created_address.wait()).status
    let status;
    stat === 1? status = "SUCCESS": stat === 0 ? status = "FAILED" : status = undefined;

    return status
}

export const getAds = async() => {
    let user_contract = new ethers.Contract(contract_address, userBaseAbi, provider)
    let result = await user_contract.getAds()
    return result
}

export const getUserAds = async(address) => {
    let user_contract = new ethers.Contract(contract_address, userBaseAbi, provider)
    let result = await user_contract.getUserAds(address)
    return result
}

export function emptyCache() {
    if('caches' in window){
    caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });

        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload(true);
    }
}

export async function event_listen(callback) {
    let user_contract = new ethers.Contract(contract_address, userBaseAbi, provider)
    user_contract.on("Created", callback)
}