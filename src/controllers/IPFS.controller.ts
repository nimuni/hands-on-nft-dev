import { NextFunction, Request, Response } from 'express';
import w3sIpfsInstance from '@/services/w3sIPFS.service';
import nsIpfsInstance from '@/services/nsIPFS.service';
import axios from 'axios';
import { File } from 'nft.storage'
import * as fs from "fs"
import { randomUUID } from 'crypto';
import mime from 'mime'
import path from 'path'

class IPFSController {
  //////////////////////////////////
  // Web3Storage service
  //////////////////////////////////
  public uploadOneFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // upload file via web3 storage
      console.log("call uploadFile in controller")

      const fileInfo = await w3sIpfsInstance.uploadOneFile(req.files);
      res.status(201).json({ data: fileInfo , message: 'uploadOneFile' });
    } catch (error) {
      console.log("error in controller")
      console.error(error)
      next(error);
    }
  };
  public uploadMetadata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // upload file via web3 storage
      console.log("call uploadJson in controller")
      const fileInfo = await w3sIpfsInstance.uploadJson(req.body.data);
      console.log("end of ipfsInstance uploadjson ")
      res.status(200).json({ data: fileInfo, message: 'uploadJson' });
    } catch (error) {
      console.log("error in controller")
      console.error(error)
      next(error);
    }
  };
  public getFileInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // TODO
      // download file via web3 storage
      const hash = req.params.hash;
      console.log(hash)
      const fileInfo = await w3sIpfsInstance.getW3sFileInfo(hash);

      res.status(200).json(fileInfo);
    } catch (error) {
      console.log("error in controller")
      console.error(error)
      next(error);
    }
  };



  //////////////////////////////////
  // NFT.Storage service
  //////////////////////////////////
  public uploadNFT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // upload file via web3 storage
      console.log("call uploadNFT in controller")
      let imageFile = req.files.file
      let metadata = req.body.metadata;

      const ipfsInfo = await nsIpfsInstance.storeNFT(imageFile, metadata);
      res.status(201).json({ data: ipfsInfo , message: 'uploadNFT' });
    } catch (error) {
      console.log("error in controller")
      console.error(error)
      next(error);
    }
  };
  public getMetadataFromHash = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("call getMetadataFromHash in controller")
      const hash = req.params.hash
      const response = await nsIpfsInstance.getMetadataFromHash(hash);

      if(response.status == 200){
        res.status(200).json({ data: response.data , message: 'getMetadataFromHash data' });
      } else {
        res.status(400).send();
      }
    } catch (error) {
      next(error);
    }
  }
  public getMediaFromHash = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("call getMediaFromHash in controller")
      const hash = req.params.hash
      const response = await nsIpfsInstance.getMediaFromHash(hash);

      if(response.status == 200){
        res.status(200).json({ data: response.data , message: 'getMediaFromHash data' });
      } else {
        res.status(400).send();
      }
    } catch (error) {
      next(error);
    }
  }
  //////////////////////////////////
  // upload file default
  //////////////////////////////////
  public upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // upload file via web3 storage
      console.log("call upload in controller")
      let metadata = req.body.metadata
      let files = [].concat(req.files?.file);
      if(files[0]){
        let tempFile = files[0];
        let tempFilename = fn_convertToAllowedStr(tempFile.name);
        let tempFilePath = `${__dirname}\\..\\tmp\\${randomUUID()}\\${tempFilename}`
        await tempFile.mv(tempFilePath)

        let buffer = fs.readFileSync(tempFilePath, {})
        let fileNameWithExt = path.basename(tempFilePath);
        let mimeType = mime.getType(tempFilePath);

        let fileInfo = await nsIpfsInstance.upload(buffer, fileNameWithExt, mimeType);

        fs.unlink(tempFilePath, err => {
          console.log(`file unlink failed, path = ${tempFilePath}`)
        })
        res.status(201).json({data: fileInfo});
      } else {
        // make json to json file
        let buffer = Buffer.from(metadata, 'utf8');
        const fileNameWithExt = "metadata" + ".json";
        const mimeType = "application/json";

        let fileInfo = await nsIpfsInstance.upload(buffer, fileNameWithExt, mimeType);
        res.status(201).json({data: fileInfo});
      }
    } catch (error) {
      console.log("error in controller")
      console.error(error)
      next(error);
    }
  };
}

const fn_convertToAllowedStr = (value) => {
  console.log(`call fn_convertToAllowedStr = ${value}`)
  const regex = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\.\,\!]/gi;
  return value.toString().replace(regex, "");
}

export default IPFSController;
