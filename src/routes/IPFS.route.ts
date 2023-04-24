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
    // POST   /nft                uploadNFT
    // GET    /metadata/:hash     getMetadataFromHash

    // nft.storage service
    this.router.post(`${this.path}/upload`, this.ipfsController.upload);
    this.router.post(`${this.path}/uploadSeperateGateway`, this.ipfsController.uploadSeperateGateway);
  }
}

export default IPFSRoute;
