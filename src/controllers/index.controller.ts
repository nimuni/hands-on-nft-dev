import { Request, Response, NextFunction } from 'express';
const _ = require('lodash');
import { MORALIS_APP_ID, MORALIS_SERVER_URL, MORALIS_MASTER_KEY} from '@config';
const DEFAULT_PARAMS = {
  title: process.env.WEB_TITLE,
  extractScripts: true,
  extractStyles: true
}

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

  public test = (req: Request, res: Response, next: NextFunction): void => {
    console.log("call test")
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.moralis_server_url = MORALIS_SERVER_URL;
      ejs_params.moralis_app_id = MORALIS_APP_ID;
      console.log(ejs_params)
      res.render('test', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public testLayout = (req: Request, res: Response, next: NextFunction): void => {
    console.log("call testLayout")
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      res.render('test-view', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public testLayout2 = (req: Request, res: Response, next: NextFunction): void => {
    console.log("call testLayout")
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      ejs_params.layout = "./layout/sidebar-layout"
      res.render('test-view', ejs_params)
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
