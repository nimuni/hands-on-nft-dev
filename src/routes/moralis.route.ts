import { Router } from 'express';
import MoralisController from '@controllers/moralis.controller';
import { Routes } from '@interfaces/routes.interface';

class MoralisRoute implements Routes {
  public path = '/api/moralis';
  public router = Router();
  public moralisController = new MoralisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moralisController.getMoralis);
    this.router.get(`${this.path}/getWalletNFTs/:chainName/:walletAddress`, this.moralisController.getMoralis);
  }
}

export default MoralisRoute;
