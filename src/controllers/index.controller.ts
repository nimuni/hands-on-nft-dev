import { Request, Response, NextFunction } from 'express';
const DEFAULT_PARAMS = {
  title: process.env.WEB_TITLE
}

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      let ejs_params = Object.assign(DEFAULT_PARAMS)
      res.render('index', ejs_params)
    } catch (error) {
      next(error);
    }
  };

  public testLayout = (req: Request, res: Response, next: NextFunction): void => {
    console.log("call testLayout")
    try {
      let ejs_params = Object.assign(DEFAULT_PARAMS)
      res.render('test-view', ejs_params)
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
