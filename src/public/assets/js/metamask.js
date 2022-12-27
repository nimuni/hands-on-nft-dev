const default_contrack_type = "ethereum";
const default_contrack_chain = 'goerli';

const { ethereum } = window;
let web3, installed, contract, contractWrapper, net_env, transactionBaseAddress;
let nft_contract, nft_address, nft_abi;
let market_contract, market_address, market_abi;
let auction_contract, auction_address, auction_abi;

/**
 * Metamask and web3 initialize
 * Header div
 */
let afterInitFunction = function(){};
window.onload = async function(){
  // Moralis init
  // await Moralis.start({serverUrl:MORALIS_SERVER_URL, appId:MORALIS_APP_ID})

  // web3 injection
  await initWeb3();

  // contract init
  await initContract();

  // connect wallet button change
  await changeConnectButtonLabel();

  // button event listener setting
  await initEventActions();
  await initEthereumEventListener();

  afterInitFunction();
}

async function initWeb3() {
  if(!web3){
    if(ethereum){
      web3 = new Web3(ethereum);

      let accounts = await web3.eth.getAccounts();
      console.log(`현재 로그인된 계정\n${accounts[0]}`)
      web3.eth.defaultAccount = accounts[0]
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
  nft_contract = new NftContractWrapper(await getAccount());
  market_contract = new MarketContractWrapper(await getAccount());
  auction_contract = new AuctionContractWrapper(await getAccount());

  net_env = "goerli" // "mainnet"
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
    let account = await getAccount()
    movePersonalPageBtn.innerText = account.toLowerCase();
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
      alert(error)
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

async function sampleTransaction(params) {
  const transactionParameters = {
    // nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation. 가스가격이 높을수록 빠른처리
    // gas: '0x2710', // customizable by user during MetaMask confirmation.
    to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: '0x00', // Wei로 표시되며, 전송할때 혹은 민팅수수료 등 계약에 지불할때에 사용
    data:
      '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
    // chainId: '0x5', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  // Hex    Decimal   Network
  // 0x1	  1	        Ethereum Main Network (Mainnet)
  // 0x3	  3	        Ropsten Test Network
  // 0x4	  4	        Rinkeby Test Network
  // 0x5	  5	        Goerli Test Network
  // 0x2a	  42	      Kovan Test Network

  const txHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });

  return txHash
}

/////////////////////////
// IPFS function
/////////////////////////
async function uploadFile(file) {
  console.log("call uploadFile")
  let data = new FormData();
  data.append('file', file);
  data.append('user', await getAccount())

  try {
    let resultHash = await fetch('/api/IPFS/upload', {
      method: 'POST',
      // headers: {},
      body: data
    })
    return resultHash;
  } catch (error) {
    console.error(error);
    throw(error)
  }
}
async function uploadJson(json) {
  let data = new FormData();
  data.append('metadata', json);
  data.append('user', await getAccount())

  try {
    let resultHash = await fetch('/api/IPFS/upload', {
      method: 'POST',
      // headers: {},
      body: data
    })
    return resultHash;
  } catch (error) {
    console.error(error);
    throw(error)
  }
}
