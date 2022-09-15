import { NextFunction, Request, Response } from 'express';
import moralisService from '@services/moralis.service';

class MoralisController {
  public moralisService = new moralisService();

  public getMoralis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let walletAddress = req.params.walletAddress;
      let chainName = req.params.chainName;

      let result = await this.moralisService.test(walletAddress, chainName);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  };
  public getWalletNFTs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let chainName = req.params.chainName;
      let walletAddress = req.params.walletAddress;

      let result = await this.moralisService.getWalletNFTs(chainName, walletAddress);
      res.status(200).json(result)
    } catch (error) {
      next(error);
    }
  };
}

export default MoralisController;
