import { Web3Storage, File, getFilesFromPath } from "web3.storage";
import { WEB3_STORAGE_TOKEN } from '@config';
import * as fs from "fs"
import { randomUUID } from 'crypto';

let singletonInstance;
const gatewayUri = "w3s.link/ipfs/"
const fn_convertToAllowedStr = (value) => {
  const regex = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\,\!]/gi;
  return value.toString().replace(regex, "");
}

class IPFSService {
  #web3StorageClient;

  constructor(){
    this.#web3StorageClient = this.#makeStorageClient(this.#getAccessToken());
  }

  #getAccessToken(): String {
    return WEB3_STORAGE_TOKEN;
  }
  #makeStorageClient(token): Web3Storage {
    return new Web3Storage({ token: token })
  }

  public async uploadOneFile(files): Promise<Object> {
    try {
      console.log("call uploadOneFile in service")
      let tempFile = files.file;
      let tempFilename = fn_convertToAllowedStr(tempFile.name);
      let tempFilePath = `${__dirname}\\..\\tmp\\${randomUUID()}\\${tempFilename}`

      // mv file to tmp folder
      await tempFile.mv(tempFilePath)

      let buffer = fs.readFileSync(tempFilePath, {})
      let tempfiles = [new File([buffer], tempFilename)];

      let w3sPutOptions = {}
      const cid = await this.#web3StorageClient.put(tempfiles, w3sPutOptions);

      // remove file from tmp folder
      fs.rmSync(tempFilePath, {});

      let tempUri = "https://" + gatewayUri + cid + "/" + tempFilename
      return {
        cid: cid,
        name: tempFilename,
        size: tempFile.size,
        uri: tempUri
      }

    } catch (error) {
      console.error("uploadOneFile error in IPFS.service")
      console.error(error)
      throw error
    }
  }
  public async uploadJson(jsonStr): Promise<Object>{
    try {
      let parsedJson = JSON.parse(jsonStr)
      let tempFilename = fn_convertToAllowedStr(parsedJson.name);
      let fileName = tempFilename + ".json";

      let buffer = Buffer.from(jsonStr, 'utf8');
      let tempfiles = [new File([buffer], fileName)];

      let w3sPutOptions = {}
      const cid = await this.#web3StorageClient.put(tempfiles, w3sPutOptions);
      let tempUri = "https://" + gatewayUri + cid + "/" + fileName
      return {
        cid: cid,
        name: fileName,
        uri: tempUri
      }
    } catch (error) {
      console.log(error)
    }
  }
  public async uploadFiles(folderPath: String): Promise<String> {
    try {
      console.log("call uploadFile in service")
      let getFilesFromPathOptions = {}
      const files = await getFilesFromPath(folderPath, getFilesFromPathOptions);
      console.log("files")
      console.log(files)
      let w3sPutOptions = {}
      const rootCid = await this.#web3StorageClient.put(files, w3sPutOptions)
      console.log("rootCid")
      console.log(rootCid)
      return rootCid
    } catch (error) {
      console.error("uploadFile error in IPFS.service")
      console.error(error)
      throw error
    }
  }

  public async getW3sFileInfo(hash: string): Promise<Object> {
    try {
      console.log("call getFileInfo")
      console.log(hash)
      const res = await this.#web3StorageClient.get(hash)
      console.log("res");
      console.log(res);
      if(!res.ok){
        throw new Error(`failed to get ${hash} - [${res.status}] ${res.statusText}`);
      }

      const files = await res.files();
      let fileInfo = []
      for (const file of files) {
        let tempUri = "https://" + gatewayUri + file.cid + "/" + file.name
        fileInfo.push({
          cid: file.cid,
          name: file.name,
          size: file.size,
          uri: tempUri
        })
      }
      return fileInfo
    } catch (error) {
      console.error("getFileInfo error in IPFS.service")
      console.error(error)
      throw error
    }
  }
}

if(!singletonInstance){
  singletonInstance = new IPFSService();
}

export default singletonInstance;
