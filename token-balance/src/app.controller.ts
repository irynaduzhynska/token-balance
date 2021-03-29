import {Body, Controller, Get, Post, Redirect, Render, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {MessageDto} from "./dto/MessageDto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @Render('startForm')
  root() {
    return { message: 'Hello world!' };
  }

  @Post('/get-balance')
  @Render('resultPage')
  async getBalance(@Body() message: MessageDto): Promise<object> {
    const balance = await this.appService.getBalance(message.wallet, message.token);
    return {balance: `Your balance: ${balance}`}
  }
}
