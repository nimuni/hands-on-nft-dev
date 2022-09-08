import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import moralisService from '@services/users.service';

class MoralisController {
  // public moralisService = new moralisService();

  public getMoralis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const findAllUsersData: User[] = await this.moralisService.findAllUser();

      // res.status(200).json({ data: findAllUsersData, message: 'findAll' });
      res.status(200).json({data:"call getMoralis"})
    } catch (error) {
      next(error);
    }
  };
}

export default MoralisController;
