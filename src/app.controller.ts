import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello invoked');
    return this.appService.getHello();
  }

  @Post()
  receiveEvent(@Body() event: any): void {
    this.logger.log('receiveEvent ' + JSON.stringify(event));
  }
}
