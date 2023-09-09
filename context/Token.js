import React, {useContext, createContext} from 'react';
import { useContract, useContractWrite, useContractRead} from '@thirdweb-dev/react';
import { useStateContext } from './index';


const TokenContext = createContext();

export function TokenContextProvider({children}){
    let contractAddress = "0xC5AA490b88768B696845B6Eb141A82413C64B54a";
    const TokenAddress = "0x4d37F724ac8a3381B54BaE0A026cBdB10Bf994Cf"
    const { contract } = useContract("0x4d37F724ac8a3381B54BaE0A026cBdB10Bf994Cf");
    const {address} = useStateContext()
    const { mutateAsync: approve, isLoading } = useContractWrite(contract, "approve");
    const { allowance, isLoadingAllowance } = useContractRead(contract, "allowance", [address, contractAddress]);



    const getApproval = async()=>{
      console.log("Starting Approval for this address : ", address)
      try {
        const approvaldata = await approve({ args: [contractAddress, 100000] });
        console.info("contract call successs", approvaldata);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }

    const getAllowance = async()=>{
        console.log("WOO")
        const allowance = await contract.erc20.allowance(contractAddress);
        return allowance;
  }



    return(
    <TokenContext.Provider value={{ getAllowance, getApproval, contractAddress, contract, TokenAddress }}>
        {children}
    </TokenContext.Provider>
    )
}
export const useTokenContext = () => useContext(TokenContext)