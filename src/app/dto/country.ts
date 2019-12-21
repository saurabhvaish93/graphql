import { Continent } from './continent';
import { Language } from './language';
export class Country {
  code: string;
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  currency: string;
  languages: [Language];

  constructor() {
  this.code = '';
  this.name = '';
  this.native = '';
  this.phone = '';
  this.continent = null;
  this.currency = '';
  // languages: [Language];
  }

}
