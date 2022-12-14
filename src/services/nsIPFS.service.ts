import * as fs from "fs"
import { randomUUID } from 'crypto';
import axios from 'axios';

// nftStorage import
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import path from 'path'
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGU5MDA4MmQ4NTE4MTM1ZDMwOGY1OGM4NDE0ODQ3M2E0MEE5NjI0MDgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2OTA3OTkwMjkwMywibmFtZSI6IkhhbmRzT25NYXJrZXRUZXN0In0.iRDETUMXxMEQW4X0sLnm018hGsPW9nxJ2wsLywki-v8'

const fn_convertToAllowedStr = (value) => {
  console.log(`call fn_convertToAllowedStr = ${value}`)
  const regex = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\.\,\!]/gi;
  return value.toString().replace(regex, "");
}

const removeProtocol = (uri:string) => {
  let resultUri = uri.replace("ipfs://", "");
  console.log(`resultUri=${resultUri}`);
  return resultUri;
}
const getFileExtentionFromIPFS = (ipfsUri:string) => {
  let tempStr = removeProtocol(ipfsUri);
  let strArr = tempStr.split("/");
  return strArr[strArr.length-1];
}
const addingIPFSGateway = (hashAndFilename:string) => {
  return "https://nftstorage.link/ipfs/" + hashAndFilename;
}
const convertIPFSToGatewayURI = (ipfsURI:string) => {
  return addingIPFSGateway(removeProtocol(ipfsURI))
}

let singletonInstance;

class IPFSService {
  #nftStorageClient;

  constructor(){
    this.#nftStorageClient = this.#makeStorageClient(NFT_STORAGE_KEY);
  }

  #makeStorageClient(token): NFTStorage {
    return new NFTStorage({ token: token });
  }

  public async storeNFT(imageFile, metadataStr:string) {
    console.log("call storeNFT in service")
    // save files to tmp folder
    let metadata = JSON.parse(metadataStr);
    let tempFilename = fn_convertToAllowedStr(imageFile.name);
    let tempFilePath = `${__dirname}\\..\\tmp\\${randomUUID()}\\${tempFilename}`

    // mv file to tmp folder
    await imageFile.mv(tempFilePath)
    let buffer = fs.readFileSync(tempFilePath)

    metadata.image = new File([buffer], path.basename(tempFilePath), {type: mime.getType(tempFilePath)});

    console.log(metadata)
    // return true;
    let ipfsInfo = await this.#nftStorageClient.store(metadata);
    ipfsInfo.gatewayUri = convertIPFSToGatewayURI(ipfsInfo.url)
    return ipfsInfo;
  }

  public async getMetadataFromHash (hash:string) {
    console.log("call getMetadataFromHash")
    const nftMetadataUri = addingIPFSGateway(hash + "/metadata.json");

    const axiosConfig = {};
    return await axios.get(nftMetadataUri, axiosConfig);
  }

  public async getMediaFromHash (hash:string) {
    console.log("call getMediaFromHash")
    const nftMetadataUri = addingIPFSGateway(hash + "/metadata.json");
    const axiosConfig = {};
    const tempResponse = await axios.get(nftMetadataUri, axiosConfig);
    const fileExtention = getFileExtentionFromIPFS(tempResponse.data.image);
    const nftMediaUri = addingIPFSGateway(hash + "/" + fileExtention);
    return await axios.get(nftMediaUri, axiosConfig);
  }

  public async upload (data:Buffer, name:string, mimeType:string) {
    console.log("call uploadin service")
    let file = new File([data], name, {type: mimeType});

    // Blob, File, FormData
    const cid = await this.#nftStorageClient.storeBlob(file);
    return {
      cid: cid,
      name: name,
      size: file.size,
      uri: addingIPFSGateway(cid)
    }
  }
}

if(!singletonInstance){
  singletonInstance = new IPFSService();
}

export default singletonInstance;
