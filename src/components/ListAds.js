import React, { useState, useEffect } from 'react'
import AdCard from './AdCard'
import { getAds } from '../utils/UserBaseFunc'

const ListAds = () => {
    const [info, setInfo] = useState([])

    useEffect(() => {
        const fetchAds = async () => {
            let result = await getAds();
            setInfo(result)
        }
        fetchAds()
    }, [])
    // if (!info.length) return <p>Loading...</p>
  return (
    <div >
        <h1>Google Ads</h1>
        {info.map((address) => {
            return <AdCard key={address} address={address} />
        })}
    </div>
  )
}

export default ListAds