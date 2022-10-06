const default_contrack_type = "ethereum";
const default_contrack_chain = 'rinkeby';
const MORALIS_SERVER_URL="https://w140jt5jjlbv.usemoralis.com:2053/server"
const MORALIS_APP_ID="EPXW2YoTnol6ysUDOadc2XE4BB2iHwXUm3tWmSwH"

const { ethereum } = window;
let web3, installed, contract, nft_contract_address, nft_contract_abi;

/**
 * Metamask and web3 initialize
 * Header div
 */
let afterInitFunction = function(){};
window.onload = async function(){
  // Moralis init
  await Moralis.start({serverUrl:MORALIS_SERVER_URL, appId:MORALIS_APP_ID})

  // web3 injection
  await initWeb3();

  // contract injection
  await initContract();

  // connect wallet button change
  await changeConnectButtonLabel();

  // button event listener setting
  await initEventActions();
  await initEthereumEventListener();

  afterInitFunction();
}

async function initWeb3() {
  console.log("initWeb3")

  // moralis용
  if(!web3){
    if(window.ethereum){
      console.log("metamask 사용")
      web3 = new Web3(window.ethereum);
      // console.log(web3)
      // console.log(web3.eth)
      // console.log(web3.shh)
      // console.log(web3.bzz)
      // console.log(web3.utils)
      // console.log(web3.version)
      let accounts = await web3.eth.getAccounts();
      console.log(`현재 로그인된 계정\n${accounts[0]}`)
      web3.eth.defaultAccount = accounts[0]
    } else if(typeof window.web3 !== 'undefined'){
      web3 = new Web3(window.web3.curruntProvider);
    } else {
      // moralis 없는경우, web3 인젝션이 안됨
      // throw new Error("No web3 instance injected.")

      console.log("infura 사용")
      window.web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/2c31c29191f84636ae5d8d792d10945f"));
      web3 = window.web3
    }
  }
}

async function initContract() {
  // const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431";
  nft_contract_address = "0x725CcA4b7320910df880276B1fabBAA68976006C";
  nft_contract_abi = [{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"approved",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"approve",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"string",name:"tokenURI",type:"string"}],name:"mintToken",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"},{internalType:"bytes",name:"data",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!0,internalType:"uint256",name:"tokenId",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"transferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"getApproved",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"ownerOf",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"tokenId",type:"uint256"}],name:"tokenURI",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}];

  contract = new web3.eth.Contract(nft_contract_abi, nft_contract_address);
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
    // window.location.reload();
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
    console.log("message")
    console.log(message)
  });
}

async function connectWallet() {
  if(ethereum){
    Moralis.Web3.authenticate().then(function (user) {
        // user.set("name",document.getElementById('username').value);
        // user.set("email",document.getElementById('useremail').value);
        console.log(user)
        user.set("name","testName");
        user.set("email","testEmail");
        user.save();
        console.log(user)
    })
    // 계정주소 가져오기
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // 체인정보 가져오기
    let networkId = await ethereum.request({ method: 'net_version' });
  }
}
async function authenticate() {
  console.log("call authenticate")
  let user = await Moralis.Web3.authenticate();

  if(user) {
    user.save()
  }
}
