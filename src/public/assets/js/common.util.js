const changeUrlForCors = function(url){
  // https://forum.moralis.io/t/solved-cors-error-for-ipfs-urls-nft-marketplace/13496/11
  let result;
  result = url.replace("https://ipfs.moralis.io:2053", "https://gateway.moralisipfs.com")
  console.log(result)
  return result;
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

  rowDataArray.forEach(element => {
    fn_table_AddRowInput(tableId, element, -1, true);
  });
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
  rowData.forEach(function(value, index, array){
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
  rowData.forEach(function(value, index, array){
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
// overlays function
/////////////////////////
const fn_overlay_blindLoading = function(show, message){
  const body = document.getElementsByTagName('body')[0];
  const loadingBlindDom = document.getElementById("loadingBlind");
  const loadingLabelDom = document.getElementById("loadingLabel");


  if(show){
    body.classList.add("holding-body");
    loadingBlindDom.classList.remove("d-none")

    loadingLabelDom.innerText = message;
    fn_overlay_blindDotAnimation(true);
  } else {
    body.classList.remove("holding-body");
    loadingBlindDom.classList.add("d-none");

    loadingLabelDom.innerText = "Loading";
    fn_overlay_blindDotAnimation(false);
  }
}
let var_fn_overlayIntervalId;
const fn_overlay_blindDotAnimation = function(show){
  const loadingDotDom = document.getElementById("loadingDot");
  const MAX_DOT_COUNT = 4;
  const DOT_STR = ".";
  let currentDotCount = 1;
  let dotStr = "."
  if(show){
    if(!var_fn_overlayIntervalId){
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
  } else {
    dotStr = DOT_STR;
    currentDotCount = 1;
    loadingDotDom.innerText = dotStr;
    clearInterval(var_fn_overlayIntervalId);
  }
}
const fn_overlay_blindLabel = function(value="Loading..."){
  const loadingLabelDom = document.getElementById("loadingLabel");
  loadingLabelDom.innerText = value;
}
