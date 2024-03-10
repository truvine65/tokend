
import { ethers } from 'ethers';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [userInput, setUserInput]=useState("")
    const [generatedUrl, SetGeneratedUrl]=useState("")


  function isValidEthereumAddress(address:string) {
    return ethers.utils.isAddress(address);
 }

  const handleSubmit=()=>{
   const isvald=isValidEthereumAddress(userInput)
    if (isvald){
        SetGeneratedUrl(`http://localhost:3000/auth/${userInput}`)
    }else{
        alert("input not a valid address")
    }


  }


useEffect(()=>{
    console.log(userInput)
},[userInput])
  return (
    <main
      className={` min-h-screen px-24 ${inter.className}`}
    >
<input 
type="text" 
placeholder='enter your address' 
className='w-full outline-none bg-gray-500 h-20 rounded-md mt-20 px-5 text-black'
value={userInput}
onChange={(e)=>setUserInput(e.target.value)}
 />

 <p>{generatedUrl}</p>

<div className='flex gap-5 mt-5'>
    <button className='bg-blue-600 h-10 w-32 rounded-md' onClick={()=>handleSubmit()}>Submit</button>
    <CopyToClipboard text={generatedUrl}
      >
          <button className='bg-blue-600 h-10 w-32 rounded-md'>Copy</button>
        </CopyToClipboard>
   
</div>
    </main>
  )
}
