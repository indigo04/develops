import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('meals')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string): Promise<any> {
    return this.appService.getById(id);
  }

  @Get()
  @HttpCode(200)
  getFilteredMeals(@Query('filter') filter: string): Promise<any> {
    console.log('Filter received:', filter);
    if (filter) {
      return this.appService.getFilteredMeals(filter);
    } else {
      return this.appService.getAllMeals();
    }
  }
}
