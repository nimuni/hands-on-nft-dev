import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  // page 세팅
  private initializeRoutes() {
    this.router.get(this.path+`/`, this.indexController.index);
    this.router.get(this.path+`/nft`, this.indexController.explore);
    this.router.get(this.path+`/nft/:contractAddress/:tokenId`, this.indexController.nftDetail);
    this.router.get(this.path+`/market`, this.indexController.market);
    this.router.get(this.path+`/auction`, this.indexController.auction);
    // this.router.get(this.path+`/ranking`, this.indexController.rankCollection);
    // this.router.get(this.path+`/ranking/tradeHistory`, this.indexController.rankTradeHistory);
    // this.router.get(this.path+`/resources/WhatisNFT`, this.indexController.WhatisNFT);
    // this.router.get(this.path+`/resources/WhatisCryptoWallet`, this.indexController.WhatisCryptoWallet);
    // this.router.get(this.path+`/resources/WhatisGasFee`, this.indexController.WhatisGasFee);
    // this.router.get(this.path+`/resources/FAQ`, this.indexController.FAQ);
    // this.router.get(this.path+`/resources/Partners`, this.indexController.Partners);
    // this.router.get(this.path+`/resources/Blogs`, this.indexController.Blogs);
    // this.router.get(this.path+`/resources/Dev-docs`, this.indexController.Dev-docs);
    this.router.get(this.path+`/create`, this.indexController.create);




    this.router.get(this.path+`/test`, this.indexController.test);
    this.router.get(this.path+`/testLayout`, this.indexController.testLayout);
    this.router.get(this.path+`/testLayout2`, this.indexController.testLayout2);
    this.router.get(this.path+`/mintTest`, this.indexController.mintTest);
    this.router.get(this.path+`/contractTest`, this.indexController.contractTest);
  }
}

export default IndexRoute;
