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
  receiveEvent(@Body() event: any): any {
    if (Array.isArray(event)) {
      for (const ev of event) {
        if (
          ev.eventType === 'Microsoft.EventGrid.SubscriptionValidationEvent'
        ) {
          return { validationResponse: ev.validationCode };
        } else {
          this.logger.log('eventType ' + ev.eventType);
          this.logger.log(JSON.stringify(event));
        }
      }
    } else {
      this.logger.log('receiveEvent ' + JSON.stringify(event));
      return '';
    }
  }
}
