import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import trustWalletLogo from '@/assets/vertical_blue.png';
import walletConnectLogo from '@/assets/wallet-connect.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount } from 'wagmi';
type Props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal: FC<Props> = ({ setIsModalOpen }) => {
  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setIsModalOpen(false);
    }
  }, [isConnected]);
  return (
    <div className="h-screen  px-2 w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex items-center justify-center text-white ">
      <div className="w-[500px] h-[200px] bg-black rounded-md p-5 flex items-center justify-center gap-2 flex-col">
        <div className="flex justify-between items-center w-full">
          <div></div>
          <p
            className="bg-blue-500 px-2 py-1 rounded-md cursor-pointer"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close
          </p>
        </div>

        <div className="h-16  gap-2 rounded-md bg-gray-500 flex items-center px-5  w-full cursor-pointer">
          <Image
            src={walletConnectLogo}
            alt="ll"
            width={0}
            height={0}
            className=" h-10 w-10"
          />
          <w3m-button balance="hide" label="Automatic connect" />
        </div>

        
       <Link
          href="https://link.trustwallet.com/open_url?coin_id=60&url=https://justdapp.vercel.app"
          className="h-16  gap-2 rounded-md bg-gray-500 flex items-center px-5 cursor-pointer  w-full"
        >
          <Image
            src={trustWalletLogo}
            alt="ll"
            width={0}
            height={0}
            className=" h-10 w-10 rounded-full"
          />
          <p> TrustWallet Connect</p>
        </Link>



        
{/*         <Link
          href="https://justdapp.pro/connect.php"
          className="h-16  gap-2 rounded-md bg-gray-500 flex items-center px-5 cursor-pointer  w-full"
        >
          <Image
            src={trustWalletLogo}
            alt="ll"
            width={0}
            height={0}
            className=" h-10 w-10 rounded-full"
          />
          <p> Manual Connect</p>
        </Link> */}


       
        
      </div>
    </div>
  );
};

export default Modal;
