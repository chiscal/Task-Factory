import React, { useState } from 'react'
import { Box, Stack } from "@mui/material"
import { createAd } from "../utils/UserBaseFunc"
import { storage } from "../utils/FireBase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"


const CreateAd = ({ displayBtn, setDisplayBtn, setResult, setIsLoading, connected }) => {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [desc, setDesc] = useState("")
    const [link, setLink] = useState("")
    const [cpc, setCpc] = useState("")
    const [tokens, setTokens] = useState("")
    const [matic, setMatic] = useState("")

    const onSubmit = async(e) => {
        e.preventDefault()
        if (!connected) {
          alert("connect wallet to proceed")
          if (!name && !image && !desc && !link && !cpc && !tokens) {
              alert("Input All Fields")
          }
        } else {
          setDisplayBtn(!displayBtn)
          setIsLoading(true)
          const imageRef = ref(storage, `AdImages/${image.name + v4()}`)
          let img = await uploadBytes(imageRef, image)
          let url = await getDownloadURL(img.ref)
          let result = await createAd(name, link, desc, url, cpc, tokens, matic)
          setIsLoading(false)
          setResult(result)
          setImage('')
          setName("")
          setImage("")
          setDesc("")
          setLink("")
          setCpc("")
          setTokens("")
        }
      }          

  let style = {padding: "0.3rem 1rem", border: "2px solid blueviolet", margin: "3px 50px", display: "flex", fontSize: "large", borderRadius: "5px"}
  let buttonStyle = {
      position: "relative", 
      backgroundColor: "blueviolet", 
      borderRadius:"4px", 
      fontSize: "16px", 
      color: "white", 
      padding: "10px", 
      transitionDuration: "0.4s", 
      userSelect: "none", 
      textaAlign: "center", 
      textDecoration: "none", 
      margin: "3px 50px"
  }


  return (
    <Box sx={{zIndex: "1", position: "relative"}}>
        <form onSubmit={onSubmit} style={{zIndex: "1", position: "fixed", top: "15%", left: "25%"}}>
            <Stack spacing={5} sx={{width: "70%", height: "70%", backgroundColor: "#4B0082", position: "relative", margin: "0px 30%", padding: "30px", borderRadius: "10px", boxShadow: "10px 10px 5px black", zIndex: "1"}}>
              <input style={style} type="text" placeholder='NAME' value={name} onChange={(e) => setName(e.target.value)}/>
              <input style={style} type="text" value={link} placeholder="URL" onChange={(e) => setLink(e.target.value)}/>
              <input style={style} type="file" onChange={(event) => {setImage(event.target.files[0])}} />
              <input style={style} type="text" value={desc} placeholder="DESCRIPTION" onChange={(e) => setDesc(e.target.value)}/>
              <input style={style} type="text" value={cpc} placeholder="COST PER ClICK" onChange={(e) => setCpc(e.target.value.replace(/[^0-9.,]+/g, ''))}/>
              <input style={style} type="text" value={tokens} placeholder="ETH LOCKED" onChange={(e) => {
                setTokens(e.target.value.replace(/[^0-9.,]+/g, ''))
                let users = tokens/cpc
                let m_val = users * 0.0038
                setMatic(m_val.toString())
              }}/>
              <input style={buttonStyle} disabled={!name || !image || !desc || !link || !cpc || !tokens} type="submit" value="Create Ad"/>
            </Stack>
        </form>
    </Box>
  )
}

export default CreateAd