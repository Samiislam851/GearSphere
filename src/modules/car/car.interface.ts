/* eslint-disable no-unused-vars */
export enum CarCategory {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  TRUCK = 'Truck',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
}

export interface CarInterface {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
}
