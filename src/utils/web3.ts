import { ethers, Contract } from 'ethers';
import POSTNFT_ABI from '../ABI.json';

export const POSTNFT_CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';
export const MONAD_CHAIN_ID = 10143;
export const MONAD_RPC = 'https://testnet-rpc.monad.xyz';

export function getPostNFTContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  return new Contract(
    POSTNFT_CONTRACT_ADDRESS,
    POSTNFT_ABI,
    signerOrProvider || new ethers.JsonRpcProvider(MONAD_RPC)
  );
} 