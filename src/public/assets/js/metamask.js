const default_contrack_type = "ethereum";
const default_contrack_chain = 'rinkeby';
const MORALIS_SERVER_URL="https://sbp5aslmofyj.usemoralis.com:2053/server"
const MORALIS_APP_ID="B8NSQYhCa7PqGamcdhbjWww14LgCOslOLalzAGjM"

const {ethereum} = window;
let web3, installed;

/**
 * Metamask and web3 initialize
 * Header div
 */
window.onload = async function(){
  // Moralis init
  await Moralis.start({serverUrl:MORALIS_SERVER_URL, appId:MORALIS_APP_ID})

  // web3 injection
  await initWeb3();

  // connect wallet button change
  await changeConnectButtonLabel();
  
  // button event listener setting
  await initEventActions();
}

async function initWeb3() {
  if(!web3){
    if(window.ethereum){
      web3 = new Web3(window.ethereum);
    } else if(typeof window.web3 !== 'undefined'){
      web3 = new Web3(window.web3.curruntProvider);
    } else {
      // metamask 없는경우, web3 인젝션이 안됨
      throw new Error("No web3 instance injected.")
    }
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
      console.log(1)
      location.href="/testLayout";
    } else {
      console.log(2)
      await changeConnectButtonLabel()
    }
  })
}

async function connectWallet() {
  if(ethereum){
    await ethereum.request({ method: 'eth_requestAccounts' });
  }
}

/**
 * Metamask function
 */

