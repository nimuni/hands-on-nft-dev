import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import IPFSController from '@/controllers/IPFS.controller';

class IPFSRoute implements Routes {
  public path = '/api/IPFS';
  public router = Router();
  public ipfsController = new IPFSController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // POST   /media              uploadOneFile
    // POST   /metadata           uploadJson
    // GET    /:hash              getFileInfo

    // POST   /nft                uploadNFT
    // GET    /metadata/:hash     getMetadataFromHash

    // Web3Storage service
    this.router.post(`${this.path}/media`, this.ipfsController.uploadOneFile);
    this.router.post(`${this.path}/metadata`, this.ipfsController.uploadMetadata);
    this.router.get(`${this.path}/:hash`, this.ipfsController.getFileInfo);

    // nft.storage service
    this.router.post(`${this.path}/upload`, this.ipfsController.upload);
    // this.router.post(`${this.path}/nft1155`, this.ipfsController.uploadNFT);
    // this.router.get(`${this.path}/metadata/:hash`, this.ipfsController.getMetadataFromHash);
    // this.router.get(`${this.path}/media/:hash`, this.ipfsController.getMediaFromHash);
  }
}

export default IPFSRoute;
