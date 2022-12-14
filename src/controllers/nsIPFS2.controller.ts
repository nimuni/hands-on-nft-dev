import { NextFunction, Request, Response } from 'express';
import nsIpfsInstance from '@/services/nsIPFS.service';
import axios from 'axios';

// TODO
// web3 storage가 아닌 nft.storage 서비스를 이용하기위해 IPFS 접근방법 필요.
// NFT.Storage는 ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json 방식으로 저장하기 때문에
// 해당 이미지나 메타데이터를 읽어오기 위해서는 IPFS에 접근하여 데이터를 받을 수 있어야 함.
// 참고 https://velog.io/@fdongfdong/Blockchain-Truffle%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-ERC-721NFT-%EA%B0%9C%EB%B0%9C
// {
//   name: "FdongFdong NFT",
//   description: "FdongFdong",
//   image: new File([fs.readFileSync('./temp.PNG')], 'temp.PNG', {
//     type: 'image/PNG',
//   }),
//   attributes: [
//     {
//       trait_type: 'Rarity',
//       value: 'LEGENDARY',
//     },
//   ],
// }
// 한번에 업로드 가능
class IPFS2Controller {
  public uploadNFT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // upload file via web3 storage
      console.log("call uploadNFT in controller")
      let imageFiles = req.files
      let metadata = req.body.metadata;

      const ipfsInfo = await nsIpfsInstance.storeNFT(imageFiles, metadata);
      ipfsInfo.gatewayUri = this.convertIPFSToGatewayURI(ipfsInfo.url);
      console.log("ipfsInfo=")
      console.log(ipfsInfo)
      console.log(ipfsInfo.gatewayUri)
      res.status(201).json({ data: ipfsInfo , message: 'uploadNFT' });
    } catch (error) {
      console.log("error in controller")
      console.error(error)
      next(error);
    }
  };
  public getMetadataFromHash = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hash = req.params.hash
      const nftMetadataUri = this.addingIPFSGateway(hash+ "/metadata.json");

      const axiosConfig = {};
      const response = await axios.get(nftMetadataUri, axiosConfig)
      if(response.status == 200){
        res.status(200).json({ data: response.data , message: 'searchedNFT data' });
      } else {
        res.status(400).send();
      }
    } catch (error) {
      next(error);
    }
  }

  removeProtocol = (uri:String) => {
    let resultUri = uri.replace("ipfs://", "");
    console.log(`resultUri=${resultUri}`);
    return resultUri;
  }
  addingIPFSGateway = (uri:String) => {
    return "https://nftstorage.link/ipfs/" + uri;
  }
  convertIPFSToGatewayURI = (ipfsURI:String) => {
    return this.addingIPFSGateway(this.removeProtocol(ipfsURI))
  }

}

export default IPFS2Controller;
