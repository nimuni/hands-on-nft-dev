import Moralis from "moralis"
import { EvmChain, EvmAddressish, EvmChainish, EvmNative } from "@moralisweb3/evm-utils"
import { MORALIS_APP_ID, MORALIS_SERVER_URL, MORALIS_MASTER_KEY, MORALIS_WEB3_API_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

// Reference
// https://docs.moralis.io/docs/nodejs-dapp-from-scratch
// https://docs.moralis.io/reference/supported-chains-for-nft-api
// 내 지갑주소 임시로세팅
const testWalletAddress = "0x017DeaE179A3E9632c11d63971090056886f6f70"

class MoralisService {
  public async test(walletAddress:string, chainName:string) {
    const tempWalletAddress = walletAddress || testWalletAddress
    let nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: tempWalletAddress,
      chain: getChainNameFromString(chainName)
    })

    const native = nativeBalance.result.balance.ether
    return { native }
  }

  public async getWalletNFTs(walletAddress:string, chainName:string){
    const tempWalletAddress = walletAddress || testWalletAddress
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address: tempWalletAddress,
      chain: getChainNameFromString(chainName)
    });
    return response
  }
}

const getChainNameFromString = (chainName: string | number | EvmChainish) => {
  switch (chainName) {
    case "eth":
      return EvmChain.ETHEREUM
    case "ropsten":
      return EvmChain.ROPSTEN
    case "rinkeby":
      return EvmChain.RINKEBY
    case "goerli":
      return EvmChain.GOERLI
    case "kovan":
      return EvmChain.KOVAN
    case "polygon":
      return EvmChain.POLYGON
    case "mumbai":
      return EvmChain.MUMBAI
    case "bsc":
      return EvmChain.BSC
    case "bsc testnet":
      return EvmChain.BSC_TESTNET
    case "avalanche":
      return EvmChain.AVALANCHE
    // case "avalanche testnet":
    //   return EvmChain.AVALANCHE_TESTNET // 테스트넷이 없음
    //   break;
    case "fantom":
      return EvmChain.FANTOM
    case "cronos":
      return EvmChain.CRONOS
    case "cronos testnet":
      return EvmChain.CRONOS_TESTNET
    default:
      return EvmChain.RINKEBY
  }
}

export default MoralisService;
