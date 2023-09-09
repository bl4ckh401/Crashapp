import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context';
import { useTokenContext } from '../../context/Token';
import { useContract, useContractRead, Web3Button } from '@thirdweb-dev/react';

function BetCard() {
  const {getApproval, getAllowance,contractAddress,TokenAddress ,contract} = useTokenContext()
  const [checkedAllowance, setCheckedAllowance] = useState(true);
  const[amount, setAmount] = useState(0)
  const {BetOnEvent, address} = useStateContext();

  const fetchApproval = async()=>{
    await getApproval()
  }

  const fetchAllowance = async () => {
    try {
      let allowance = await getAllowance()
      console.log(parseInt(allowance.value._hex))
      if(parseInt(allowance.value._hex) == 0){
        console.log("We are in the Zooooone")
        fetchApproval();
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value)
  }
  const handleBet = async(e) => {
    e.preventDefault();
    let placeBet = await BetOnEvent(amount)
    console.log(placeBet)
  }

  useEffect(() => {
      fetchAllowance();
  }, [checkedAllowance]);
  

  return (
    <div className="bet-card" style={{ width:"80%" , opacity:0.7,display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
      <h3 className="bet-title" style={{ color:"white" }}>Place Your Bet</h3>
      <div className="bet-info" style={{ display:"flex", flexDirection:"row",width:"100%", justifyContent:"flex-start", alignItems:"flex-start", display:"flex" }} >
        <input value={amount} onChange={handleInputChange} type='number' step={1000} style={{ color:"white",width:"100%", padding:"12px", background:"transparent", borderRadius:"8px", borderWidth:"0.5px" }} placeholder={'$YUNO: 1000000'} className="bet-amount"></input>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }} onClick={handleBet}>Place Bet</button>
      </div>
      <div className="button-container">
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>1000</button>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>10000</button>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>50000</button>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>1000000</button>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>2000000</button>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>5000000</button>
        <button className="place-bet" style={{ padding:"12px", width:"20%", marginLeft:"20px", borderRadius:"10px" }}>10000000</button>
      </div>
    </div>
  );
}

export default BetCard;
