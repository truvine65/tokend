import { ethers } from "ethers";
import tokneAbi from "@/lib/tokenAbi.json"
export const IERC20Contract=(contractAddress:string)=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer=provider.getSigner()
    let contract=new ethers.Contract(contractAddress,tokneAbi,signer)
    return contract
}