import { Request, Response, NextFunction } from 'express';
const _ = require('lodash');
const DEFAULT_PARAMS = {
  title: process.env.WEB_TITLE,
  extractScripts: true,
  extractStyles: true
}
const { dirname } = require('path');
const appDir = dirname(require.main.filename);


class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log(ejs_params)
      res.render('index', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public explore = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log(ejs_params)
      res.render('explore', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public nftDetail = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.contractAddress = req.params.contractAddress
      ejs_params.tokenId = req.params.tokenId
      console.log(ejs_params)
      res.render('nftDetail', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public nftListForSale = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.contractAddress = req.params.contractAddress
      ejs_params.tokenId = req.params.tokenId
      console.log(ejs_params)
      res.render('nftListForSale', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public market = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.contractAddress = req.params.contractAddress
      ejs_params.tokenId = req.params.tokenId
      ejs_params.layout = "./layout/wide-layout"
      console.log(ejs_params)
      res.render('market', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public marketItem = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.contractAddress = req.params.contractAddress
      ejs_params.tokenId = req.params.tokenId
      ejs_params.layout = "./layout/wide-layout"
      console.log(ejs_params)
      res.render('marketItem', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public marketListed = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.contractAddress = req.params.contractAddress
      ejs_params.tokenId = req.params.tokenId
      ejs_params.layout = "./layout/wide-layout"
      console.log(ejs_params)
      res.render('marketListed', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public auction = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log(ejs_params)
      res.render('auction', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log(ejs_params)
      res.render('create', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public contractSample = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log(ejs_params)
      res.render('contractSample', ejs_params)
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
