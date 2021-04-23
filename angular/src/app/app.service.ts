import { Injectable } from '@angular/core';

export class Data {
  id: number;
  price: number;
  startDate: Date;
  endDate: Date;
  text: string;
  director: string;
  year: number;
  image: string;
  duration: number;
}

export class EditData extends Data {
  seatRow: string;
  seatNumber: number;
}

const data: Data[] = [
  {
    id: 1,
    price: 10,
    startDate: new Date(2015, 4, 25, 9, 10),
    endDate: new Date(2015, 4, 25, 11, 1),
    text: 'His Girl Friday',
    director: 'Howard Hawks',
    year: 1940,
    image:
      'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/HisGirlFriday.jpg',
    duration: 92,
  },
  {
    id: 2,
    price: 5,
    startDate: new Date(2015, 4, 25, 11, 30),
    endDate: new Date(2015, 4, 25, 13, 2),
    text: 'Royal Wedding',
    director: 'Stanley Donen',
    year: 1951,
    image:
      'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/RoyalWedding.jpg',
    duration: 93,
  },
  {
    id: 3,
    price: 15,
    startDate: new Date(2015, 4, 25, 13, 30),
    endDate: new Date(2015, 4, 25, 15, 21),
    text: 'A Star Is Born',
    director: 'William A. Wellman',
    year: 1937,
    image:
      'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/AStartIsBorn.jpg',
    duration: 111,
  },
];

@Injectable()
export class Service {
  getData() {
    return data;
  }

  getRows(): string[] {
    return ['A', 'B', 'C', 'D'];
  }

  getSeats(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
