const openEtherscan = (type="tx", value1, value2) => {
  const baseURI = "https://etherscan.io";
  console.log(type)
  console.log(value1)
  switch (type) {
    case "tx":
      window.open(`${baseURI}/tx/${value1}`);
      break;
    case "contract":
      window.open(`${baseURI}/address/${value1}`)
      break;
    default:
      window.open(`${baseURI}/tx/${value1}`);
      break;
  }
}

const openUserInfoPage = (address) => {
  window.location.href = window.location.origin + `/user/${address}`
}
/////////////////////////
// common util function
/////////////////////////
const UNIT_WEI_AS_ETH = 0.000000000000000001;
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
}
const isValidEth = (str) => {
  const regex =  /^\d*(\.?\d*)$/;
  return regex.test(str) && Number(str) > UNIT_WEI_AS_ETH ? true : false;
}
const isValidEthMessage = (str) => {
  const regex =  /^\d*(\.?\d*)$/;
  if(regex.test(str)){
    if(Number(str) > UNIT_WEI_AS_ETH){
      return "Valid"
    } else {
      return "Input value have to bigger than 1 wei"
    }
  } else {
    return "Please check the Input value"
  }
}

const getTimeDiffAndUnit = (_fromTimestamp, _toTimestamp=new Date().getTime()) => {
  const SECOND_CONDITION = 1000;
  const MINUTE_CONDITION = SECOND_CONDITION * 60;
  const HOUR_CONDITION = MINUTE_CONDITION * 60;
  const DAY_CONDITION = HOUR_CONDITION * 24;
  const WEEK_CONDITION = DAY_CONDITION * 7;
  const MONTH_CONDITION = DAY_CONDITION * 31;
  const YEAR_CONDITION = DAY_CONDITION * 365;

  let from = new Date(Number(_fromTimestamp))
  let to = new Date(Number(_toTimestamp))

  let diff = (to - from);
  let diffAbs = Math.abs(diff)
  if(isNaN(diff)) return;

  if(diffAbs < MINUTE_CONDITION){
    return {unit:"second", diff: parseInt(diff / SECOND_CONDITION)}
  } else if(diffAbs < HOUR_CONDITION){
    return {unit:"minute", diff: parseInt(diff / MINUTE_CONDITION)}
  } else if(diffAbs < DAY_CONDITION){
    return {unit:"hour", diff: parseInt(diff / HOUR_CONDITION)}
  } else if(diffAbs < WEEK_CONDITION){
    return {unit:"day", diff: parseInt(diff / DAY_CONDITION)}
  } else if(diffAbs < MONTH_CONDITION){
    return {unit:"week", diff: parseInt(diff / WEEK_CONDITION)}
  } else if(diffAbs < YEAR_CONDITION){
    return {unit:"month", diff: parseInt(diff / MONTH_CONDITION)}
  } else {
    return {unit:"year", diff: parseInt(diff / YEAR_CONDITION)}
  }
}

const maskingString = (str, frontCount=6, backCount=4) => {
  if(str.length > (frontCount + backCount + 3)) {
    let originStr = str.split('');
    originStr.forEach((elem, i) => {
      if (i >= frontCount && i < (originStr.length - backCount)) {
        originStr[i] = ".";
      } else {
        return;
      }
    });
    let resultStr = originStr.join('');
    let regex = /[.]+/;
    return resultStr.replace(regex, '...');
  } else {
    return str;
  }
};

let intervalFunctionObj = {};
let intervalVariable;
const intervalDuration = 1000;

const initPublicInterval = (durationTime) => {
  intervalVariable = setInterval(()=>{
    console.log("intervalFunctionArray")
    Object.keys(intervalFunctionObj).forEach(function(elem){
      console.log(elem)
      console.log(intervalFunctionObj[elem]);
      intervalFunctionObj[elem]();
    })
  }, durationTime ? durationTime : intervalDuration)
}
const clearPublicInterval = () => {
  clearInterval(intervalVariable);
}
const addFunctionToPublicInterval = (func) => {
  intervalFunctionObj[func.name] = func;
}
const removeFunctionToPublicInterval = (func) => {
  if(typeof func == 'function') {
    delete intervalFunctionObj[func.name];
  } else if(typeof func == 'string'){
    delete intervalFunctionObj[func];
  } else {
    console.log("removeFunctionToPublicInterval error. func is not function or string")
  }
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/////////////////////////
// common table function
/////////////////////////
// fn_table_Initialize(tableId, rowDataArray)
// fn_table_DataClear(tableId)
// fn_table_AddRowInput(tableId, rowData, sort=-1, buttonExist=false)
// fn_table_AddRowText(tableId, rowData, sort=-1, buttonExist=false)
// fn_table_RemoveRow(tableId, trDom)
// fn_table_RemoveRowByIndex(tableId, rowIndex)
// fn_table_getInputDataFromTableId(tableId, buttonExist=false)
const fn_table_Initialize = (tableId, rowDataArray) => {
  fn_table_DataClear(tableId)
  if(rowDataArray){
    rowDataArray.forEach(element => {
      fn_table_AddRowInput(tableId, element, -1, true);
    });
  }
}
const fn_table_DataClear = (tableId) => {
  let table = document.getElementById(tableId);
  let rows = [...table.rows];
  for(let i=1; i<rows.length; i++){
    table.deleteRow(1);
  }
}
const fn_table_AddRowInput = (tableId, rowData, sort=-1, buttonExist=false) => {
  let table = document.getElementById(tableId);
  let newRow = table.insertRow(sort);
  rowData.forEach((value, index, array) => {
    let tempCell = newRow.insertCell(-1);
    tempCell.innerHTML = `<input type="text" class="form-control" value="${value}"/>`;

  })
  if(buttonExist){
    let tempCell = newRow.insertCell(-1);
    tempCell.innerHTML = `<button type="button" class="btn btn-outline-danger btn-sm" onclick="fn_table_RemoveRow('${tableId}', this.parentNode.parentNode)">
                            <i class="bi bi-dash-circle" style="font-weight: bold; color:red"></i>
                          </button>`;
  }
}
const fn_table_AddRowText = (tableId, rowData, sort=-1, buttonExist=false) => {
  let table = document.getElementById(tableId);
  let newRow = table.insertRow(sort);
  rowData.forEach((value, index, array) => {
    let tempCell = newRow.insertCell(-1);
    tempCell.innerText = value;
  })
  if(buttonExist){
    let tempCell = newRow.insertCell(-1);
    tempCell.innerHTML = `<button type="button" class="btn btn-outline-danger btn-sm" onclick="fn_table_RemoveRow('${tableId}', this.parentNode.parentNode)">
                            <i class="bi bi-dash-circle" style="font-weight: bold; color:red"></i>
                          </button>`;
  }
}
const fn_table_RemoveRow = (tableId, trDom) => {
  let table = document.getElementById(tableId);
  let rowIndex = trDom.rowIndex

  table.deleteRow(rowIndex);
}
const fn_table_RemoveRowByIndex = (tableId, rowIndex) => {
  let table = document.getElementById(tableId);
  table.deleteRow(rowIndex);
}
const fn_table_getInputDataFromTableId = (tableId, buttonExist=false) => {
  console.log("call fn_table_getInputDataFromTableId")
  let table = document.getElementById(tableId);
  let trRows = [...table.rows];
  let metaData = [];
  let data = [];

  let metaRow = trRows.splice(0,1);
  let metaTdArray = [...metaRow[0].children];
  test = metaRow[0]
  let forLoopLength = buttonExist ? metaTdArray.length-1 : metaTdArray.length;
  for(let i=0; i<forLoopLength; i++){
    metaData.push(metaTdArray[i].innerText)
  }

  trRows.forEach(element => {
    let tdArray = [...element.children]
    let rowData = [];
    for(let i=0; i<forLoopLength; i++){
      // WARN. td 첫번째 자식 요소의 value값을 가져오던지, 자식이 없다면 텍스트를 가져옴.
      rowData.push(tdArray[i].children[0] ? tdArray[i].children[0].value : tdArray[i].innerText);
    }
    data.push(rowData)
  });
  return {metaData, data};
}


/////////////////////////
// HTML overlays function
/////////////////////////
const fn_overlay_blindLoading = (show, message) => {
  const bodyDom = document.getElementsByTagName('body')[0];
  const loadingBlindDom = document.getElementById("loadingBlind");
  const loadingLabelDom = document.getElementById("loadingLabel");


  if(show){
    bodyDom.classList.add("holding-body");
    loadingBlindDom.classList.remove("d-none")

    loadingLabelDom.innerText = message;
    fn_overlay_blindDotAnimation(true);
  } else {
    bodyDom.classList.remove("holding-body");
    loadingBlindDom.classList.add("d-none");

    loadingLabelDom.innerText = "Loading";
    fn_overlay_blindDotAnimation(false);
  }
}
let var_fn_overlayIntervalId;
const fn_overlay_blindDotAnimation = (show) => {
  const loadingDotDom = document.getElementById("loadingDot");
  const MAX_DOT_COUNT = 4;
  const DOT_STR = ".";
  let currentDotCount = 1;
  let dotStr = "."
  const setIntervalDot = () => {
    var_fn_overlayIntervalId = setInterval(() => {
      if(currentDotCount < MAX_DOT_COUNT){
        currentDotCount++
        dotStr = DOT_STR.repeat(currentDotCount);
      } else {
        dotStr = DOT_STR;
        currentDotCount = 1;
      }
      loadingDotDom.innerText = dotStr;
    }, 500);
  }
  if(show){
    if(!var_fn_overlayIntervalId){
      setIntervalDot()
    } else {
      clearInterval(var_fn_overlayIntervalId);
      setIntervalDot()
    }
  } else {
    dotStr = DOT_STR;
    currentDotCount = 1;
    loadingDotDom.innerText = dotStr;
    clearInterval(var_fn_overlayIntervalId);
  }
}
const fn_overlay_blindLabel = (value="Loading...") => {
  const loadingLabelDom = document.getElementById("loadingLabel");
  loadingLabelDom.innerText = value;
}

/////////////////////////
// common date function
/////////////////////////
const getYearStr = (_date) => {
  let day = new Date(_date);
  return day.getFullYear();
}
const getMonthStr = (_date) => {
  let day = new Date(_date);
  return (day.getMonth() + 1).toString().padStart(2, "0");
}
const getDayStr = (_date) => {
  let day = new Date(_date);
  return day.getDate().toString().padStart(2, "0");
}
const getHourStr = (_date) => {
  let day = new Date(_date);
  return day.getHours().toString().padStart(2, "0");
}
const getMinutesStr = (_date) => {
  let day = new Date(_date);
  return day.getMinutes().toString().padStart(2, "0");
}
const getYYYYMMDDStr = (_date) => {
  return `${getYearStr(_date)}-${getMonthStr(_date)}-${getDayStr(_date)}`;
}
const getDatePickerDay = (datePickerDom) => {
  let inputDate = new Date(datePickerDom.value);
  return inputDate
}

/////////////////////////
// IPFS function
/////////////////////////
const uploadFile = async (file) => {
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
const uploadJson = async(json) => {
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

/////////////////////////
// Blockchain function
/////////////////////////
const compareAddress = (addr1, addr2) => {
  const lowerAddr1 = String(addr1).toLowerCase();
  const lowerAddr2 = String(addr2).toLowerCase();
  return lowerAddr1 === lowerAddr2;
}

const isNullAddress = (addr) => {
  return addr == "0x0000000000000000000000000000000000000000"
}
const isAddress = (addr) => {
  console.log("call isAddress")
  console.log(addr)
  console.log(web3.utils.isAddress(addr))
  return web3.utils.isAddress(addr)
}
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const getDollerPriceFromEth = (wei) => {
  // TODO api를 이용해서 거래소 가격을 불러와서 달러가격리턴
  // common.util에 있는 것이 아니라, 거래소관련 util.js에 있어야할듯
  console.log("call getDollerPriceFromEth. 제작필요.")
  return wei;
}

const getDateFromBlocktime = (blockTimestamp) => {
  return new Date(blockTimestamp * 1000);
}

const isApproved = (targetAddress) => {
  return 1;
}

const convertFromBlockTime = (blockTimestamp) => {
  return blockTimestamp * 1000
}
const convertToBlockTime = (timestamp) => {
  return timestamp / 1000
}

/////////////////////////
// upbit api function
/////////////////////////
const getCurrentMarketPriceObj = async (marketType="KRW-ETH") => {
  // [{
  //   "market": "KRW-ETH",
  //   "trade_date": "20230223",
  //   "trade_time": "010854",
  //   "trade_date_kst": "20230223",
  //   "trade_time_kst": "100854",
  //   "trade_timestamp": 1677114534682,
  //   "opening_price": 2151000,
  //   "high_price": 2158000,
  //   "low_price": 2141000,
  //   "trade_price": 2150000,
  //   "prev_closing_price": 2151000.00000000,
  //   "change": "FALL",
  //   "change_price": 1000.00000000,
  //   "change_rate": 0.0004649000,
  //   "signed_change_price": -1000.00000000,
  //   "signed_change_rate": -0.0004649000,
  //   "trade_volume": 0.00376145,
  //   "acc_trade_price": 3102659094.18251000,
  //   "acc_trade_price_24h": 46831095742.14156000,
  //   "acc_trade_volume": 1444.07839701,
  //   "acc_trade_volume_24h": 21968.90669392,
  //   "highest_52_week_price": 4348000.00000000,
  //   "highest_52_week_date": "2022-04-03",
  //   "lowest_52_week_price": 1201500.00000000,
  //   "lowest_52_week_date": "2022-06-18",
  //   "timestamp": 1677114534719
  // }]
  const upbitPriceUri = `https://api.upbit.com/v1/ticker?markets=${marketType}`;
  try {
    let fetchResponse = await fetch(upbitPriceUri);
    if(fetchResponse.ok){
      let result = await fetchResponse.json();
      let priceDataObj = result[0];
      return { trade_price: priceDataObj.trade_price };
    } else {
      console.error("getCurrentMarketPrice fetchResponse not ok")
      console.log(fetchResponse);
      return null;
    }
  } catch (error) {
    return null;
  }
}
