import { Body, Controller, Get, Inject, Param, Post, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('SHRINKER_SVC') private shrinkerSvc: ClientProxy,
    @Inject('UNSHRINKER_SVC') private unshrinkerSvc: ClientProxy,
    @Inject('ACCOUNT_SVC') private accountSvc: ClientProxy,
    private readonly appService: AppService) {}
  
  @Get(':hash')
  async unshrink(
    @Res() res: Response,
    @Req() req: Request,
    @Param('hash') hash: string
  ) {
    const payload = { hash };

    this.unshrinkerSvc.send({ cmd: 'unshrink' }, payload).subscribe((url) => {
      if (!url) return res.status(404).send();
      res.redirect(url);
    }, (error) => {
      res.json(error);
    })
  }

  @Post('/v1/shrink')
  async shrinkURL(
    @Res() res: Response, 
    @Req() req: Request,
    @Body('url') url: string
  ) {
    
    //const isurlValid = await this.appService.lookupUrl(url);
    //if(!isurlValid) return res.status(400).json({ message: 'Invalid Url'});

    const payload = {
      url,
      domain: process.env.DOMAIN || 'http://localhost:5000',
      token: 'default' // replace with user token to make short urls unique
    }
    
    this.shrinkerSvc.send({ cmd: 'shrink' }, payload).subscribe((data) => res.json(data));
  }

  @Get('/v1/accounts')
  async getAllAccounts(
    @Res() res: Response
  ) {
    this.accountSvc.send({ cmd: 'account_all' }, {}).subscribe((accounts) => res.json(accounts));
  }

  
}
