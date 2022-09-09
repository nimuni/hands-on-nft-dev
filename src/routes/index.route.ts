import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  // page 세팅
  private initializeRoutes() {
    console.log("call initializeRoutes")
    this.router.get(this.path+``, this.indexController.index);
    this.router.get(this.path+`testLayout`, this.indexController.testLayout);
    console.log(this.router)
  }
}

export default IndexRoute;
