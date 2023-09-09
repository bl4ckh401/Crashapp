import React, {useContext, createContext, useState, useEffect} from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, useContractRead, getContract, useBalance } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';


const StateContext = createContext();

export const StateContextProvider = ({children}) =>{
    // let contractAddress = "0x9bBd151943f3c761BF55fB85c3C15EA1F8eE6a93";
    const { contract } = useContract("0xC5AA490b88768B696845B6Eb141A82413C64B54a");
    const { mutateAsync: placeBet, isLoading } = useContractWrite(contract, "placeBet")
    const address = useAddress();
    const connect = useMetamask();
    const router = useRouter()
    console.log(address)

    const [loading, setLoading] = useState(false)

    const BetOnEvent = async (_amount) => {
        try {
          const data = await placeBet({ args: [_amount*10**9] });
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      }
      
    

    return(
      <StateContext.Provider value={{ BetOnEvent, connect, contract, address }}>
          {children}
      </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext)