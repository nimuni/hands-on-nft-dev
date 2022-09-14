import { Request, Response, NextFunction } from 'express';
const _ = require('lodash');
const DEFAULT_PARAMS = {
  title: process.env.WEB_TITLE
}

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log("params")
      console.table(ejs_params)
      res.render('index', ejs_params)
    } catch (error) {
      next(error);
    }
  };

  public testLayout = (req: Request, res: Response, next: NextFunction): void => {
    console.log("call testLayout")
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log("params")
      console.table(ejs_params)
      res.render('test-view', ejs_params)
    } catch (error) {
      next(error);
    }
  };
  public testLayout2 = (req: Request, res: Response, next: NextFunction): void => {
    console.log("call testLayout")
    try {
      let ejs_params = _.cloneDeep(DEFAULT_PARAMS)
      console.log("params")
      console.table(ejs_params)
      ejs_params.layout = "./layout/sidebar-layout"
      console.log("params")
      console.table(ejs_params)
      res.render('test-view', ejs_params)
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
