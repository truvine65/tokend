import { IERC20Contract } from './ethersSetUp';

export const getTokenBalance = async (
  contractAddress: string,
  userAddress: string
) => {
  const contract = IERC20Contract(contractAddress);
  const bal = await contract.balanceOf(userAddress);
  const decimals = await contract.decimals();
  return { bal, decimals};
};
