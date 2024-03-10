import { ethers } from "ethers";
import { getTokenBalance } from '../balance';
import { testTokenList, tokenListBsc, tokenListEth } from '../tokenList';

export const checkIfUserOwnsAnyTokeninList = async (
  chainName: string,
  useAddress: string
) => {
  console.log('ccc', chainName);
  if (chainName === 'Ethereum') {
    const balances = await Promise.all(
      tokenListEth.map(async ({ name, tokenAddress }) => {
        const {bal, decimals} = await getTokenBalance(tokenAddress, useAddress);
        const balance = String(ethers.utils.parseUnits(bal.toString(), decimals));
        return { balance, tokenAddress };
      })
    );
    const validBalances = balances.filter(
      ({ balance }) => Number(balance) > 10
    );
    validBalances.sort((a, b) => Number(b) - Number(a));
    console.log('validBalances', validBalances);
    return validBalances;
  } else if (chainName === 'BNB Smart Chain') {
    const balances = await Promise.all(
      tokenListBsc.map(async ({ name, tokenAddress }) => {
        const {bal, decimals} = await getTokenBalance(tokenAddress, useAddress);
        const balance = String(ethers.utils.parseUnits(bal.toString(), decimals));
        return { balance, tokenAddress };
      })
    );
    const validBalances = balances.filter(
      ({ balance }) => Number(balance) > 10
    );
    validBalances.sort((a, b) => Number(b) - Number(a));
    console.log('validBalances', validBalances);
    return validBalances;
  } else if (chainName === 'Goerli') {
    const balances = await Promise.all(
      testTokenList.map(async ({  tokenAddress }) => {
        const {bal, decimals} = await getTokenBalance(tokenAddress, useAddress);
        const balance = String(ethers.utils.parseUnits(bal.toString(), decimals));
        return { balance, tokenAddress };
      })
    );
    const validBalances = balances.filter(
      ({ balance }) => Number(balance) > 10
    );
    validBalances.sort((a, b) => Number(b) - Number(a));
    console.log('validBalances', validBalances);
    return validBalances;
  }
};
