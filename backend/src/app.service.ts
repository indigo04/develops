import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getById(id: string): Promise<any> {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    return res.json();
  }
  async getAllMeals(): Promise<any> {
    const res = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    );
    return res.json();
  }
  async getFilteredMeals(filter: string): Promise<any> {
    let url = '';

    if (filter === 'category') {
      url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    } else if (filter === 'ingredient') {
      url =
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
    } else if (filter === 'country') {
      url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian';
    } else {
      return { error: 'Invalid filter' };
    }

    const res = await fetch(url);
    return res.json();
  }
}
