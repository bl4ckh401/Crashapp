// import Image from "next/image";
import React, {useState} from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <>
      <div className="" style={{ zIndex:"100", position:"relative", top:"0" }}>
        <div className="" style={{ background:"transparent", width:"100%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
            <div className="">
              <div className={`${isMenuVisible ? "flex flex-col md:flex-row w-full justify-center items-center" : "hidden md:flex flex-row"}`}>
                <div className="">
                  <div className="">
                    <ConnectWallet
                      theme="dark"
                      btnTitle="Connect Wallet"
                      className="w-full min-w-[400px]"
                      style={{ zIndex:1, position:"absolute", top:0, right:0, width:40, padding:20 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
    </>
  );
}