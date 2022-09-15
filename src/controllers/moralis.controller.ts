import { NextFunction, Request, Response } from 'express';
import moralisService from '@services/moralis.service';

class MoralisController {
  public moralisService = new moralisService();

  public getMoralis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let result = await this.moralisService.test("0x017DeaE179A3E9632c11d63971090056886f6f70","rinkeby");
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  };
}

export default MoralisController;
