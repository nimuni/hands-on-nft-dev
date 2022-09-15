const default_contrack_type = "ethereum";
const default_contrack_chain = 'rinkeby';
const MORALIS_SERVER_URL="https://sbp5aslmofyj.usemoralis.com:2053/server"
const MORALIS_APP_ID="B8NSQYhCa7PqGamcdhbjWww14LgCOslOLalzAGjM"

async function login(){
  // let user = moralis.User.current();
  // console.log(`user:${user}`)
}

window.onload = async function(){
  await Moralis.start({appId: MORALIS_APP_ID, serverUrl: MORALIS_SERVER_URL})

  // let abc = await Moralis.Cloud.run("getData")
  // console.log(abc)

  // 초기 지갑 주소 세팅
  // if (localStorage.getItem("contract_address") != null) {
  //   default_contract_address = localStorage.getItem("contract_address");
  // }
}

