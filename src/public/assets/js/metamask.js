const default_contrack_type = "ethereum";
const default_contrack_chain = 'goerli';

const { ethereum } = window;
let web3, installed, contract, contractWrapper, transactionBaseAddress;
let myWalletAddress;
let networkType, networkId, networkname;
let erc721_contract, erc721_address, erc721_abi;
let erc1155_contract, erc1155_address, erc1155_abi
let market_contract, market_address, market_abi;
let auction_contract, auction_address, auction_abi;



/**
 * Metamask and web3 initialize
 * Header div
 */
let afterInitFunction = async function(){};
let afterAccountsChange = function(){
  window.location.reload()
};
window.addEventListener('load', async () => {
  // web3 injection
  await initWeb3();

  // contract init
  await initContract();

  // connect wallet button change
  await changeConnectButtonLabel();

  // button event listener setting
  await initEventActions();
  await initEthereumEventListener();

  await afterInitFunction();
})

async function initWeb3() {
  if(!web3){
    if(ethereum){
      web3 = new Web3(ethereum);

      myWalletAddress = await getAccount();

      console.log(`현재 로그인된 계정\n${myWalletAddress}`)
      web3.eth.defaultAccount = myWalletAddress

      networkType = await web3.eth.net.getNetworkType();
      networkId = await web3.eth.net.getId();
      switch (networkId) {
        case MAIN_NET_ID:
          networkname="메인넷"
          break;
        case GOERLI_NET_ID:
          networkname="Goerli테스트넷"
          break;
        case SEPOLIA_NET_ID:
          networkname="Sepolia테스트넷"
          break;
        default:
          break;
      }
      console.log(`현재 ${networkname}에 접속중입니다.`)
      console.log(`networkType = ${networkType}\nnetworkId= ${networkId}`)
    } else if(typeof ethereum !== 'undefined'){
      web3 = new Web3(ethereum.curruntProvider);
    } else {
      // web3 인젝션이 안된경우
      throw new Error("No Metamask in browser")
    }
    ///////////////////////////////////////
    // web3 option setting
    ///////////////////////////////////////
    // 디폴트로 50블록 처리될때까지 기다리는데 100블록 처리될 때 까지 기다리는 로직
    // web3.eth.transactionBlockTimeout = 100;
    // 디폴트로 750초 대기하나, 1000초동안 대기하는 로직
    // web3.eth.transactionPollingTimeout = 1000;
  } else {
    throw new Error("No web3 instance injected.")
  }
}

async function initContract() {
  try {
    // erc721_contract = new NftContract721Wrapper();
    // erc1155_contract = new NftContract1155Wrapper();
    erc721_contract = await contractClassDecorator(BasicERC721ContractWrapper, defaultContractAddressObj[networkId].erc721, ERC721_CONTRACT_ABI);
    erc1155_contract = await contractClassDecorator(BasicERC1155ContractWrapper, defaultContractAddressObj[networkId].erc1155, ERC1155_CONTRACT_ABI);

    if(networkId == MAIN_NET_ID || networkId == GOERLI_NET_ID || networkId == SEPOLIA_NET_ID){

      // market_contract = new MarketContractWrapper();
      // auction_contract = new AuctionContractWrapper();
      market_contract = await contractClassDecorator(BasicMarketContractWrapper, defaultContractAddressObj[networkId].market, MARKET_CONTRACT_ABI);
      auction_contract = await contractClassDecorator(BasicAuctionContractWrapper, defaultContractAddressObj[networkId].auction, AUCTION_CONTRACT_ABI);
    } else {
      alert("goerli, sepolia, main 네트워크 연결 필요")
      console.log(`market_contract,auction_contract 연결되지 않음. goerli 네트워크 연결 필요`)
    }
  } catch (error) {
    console.log("error initContract in metamask.js")
    console.log(error)
  }

}

function isInstalledMetamask() {
  return Boolean(ethereum && ethereum.isMetaMask);
}

async function isMetaMaskConnected() {
  let accounts = await ethereum.request({method: 'eth_accounts'});
  return accounts && accounts.length > 0;
}
async function getAccount(){
  let accounts = await ethereum.request({method: 'eth_accounts'});
  if(accounts.length > 0){
    return accounts[0]
  } else {
    return null
  }
}

async function changeConnectButtonLabel() {
  let connectWalletBtn = document.getElementById("connectWallet");
  let movePersonalPageBtn = document.getElementById("movePersonalPage");

  if(await isMetaMaskConnected()){
    connectWalletBtn.classList.add("d-none");
    movePersonalPageBtn.classList.remove("d-none");
    movePersonalPageBtn.innerText = myWalletAddress.toLowerCase();
  } else {
    connectWalletBtn.classList.remove("d-none");
    movePersonalPageBtn.classList.add("d-none");
    movePersonalPageBtn.innerText = "no address";
  }
}

async function initEventActions() {
  let connectWalletBtn = document.getElementById("connectWallet");
  connectWalletBtn.addEventListener("click", async (e) => {
    try {
      await connectWallet()
      await changeConnectButtonLabel()
    } catch (error) {
      console.error("error in connectWalletBtn.addEventListener click")
      console.log(error)
    }
  })

  let movePersonalPageBtn = document.getElementById("movePersonalPage");
  movePersonalPageBtn.addEventListener("click", async (e)=>{
    if(await isMetaMaskConnected()){
      location.href="/testLayout";
    } else {
      await changeConnectButtonLabel()
    }
  })
}

async function initEthereumEventListener() {
  ethereum.on('accountsChanged', (accounts) => {
    console.log("accountsChanged")
    changeConnectButtonLabel();
    afterAccountsChange();
  })
  ethereum.on('chainChanged', (chainId) => {
    console.log("chainChanged")

    // 체인 바뀌면 페이지 리로딩필요
    window.location.reload();
  })
  ethereum.on('connect', connectInfo => {
    console.log("connect")
    console.log(connectInfo)
  });
  ethereum.on('disconnect', error => {
    console.log("disconnect")
    console.log(error)
  });
  ethereum.on('message', message => {
    // console.log("message")
    // console.log(message)
  });
}

async function connectWallet() {
  console.log("call connectWallet")

  if(ethereum){
    // 계정주소 가져오기
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log("eth_requestAccounts=")
    console.log(accounts)
    // 체인정보 가져오기
    let networkId = await ethereum.request({ method: 'net_version' });
    console.log("net_version=")
    console.log(networkId)
  }
}
