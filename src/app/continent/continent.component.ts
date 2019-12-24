import { Continent } from './../dto/continent';
import { Country } from './../dto/country';
import { Language } from './../dto/language';
import { Query } from './../query/query';
import { Component, OnInit, ViewEncapsulation, PipeTransform } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.css'],
  
  providers: [NgbModalConfig, NgbModal, DecimalPipe]
})
export class ContinentComponent implements OnInit {

  flag = false;

  language: Language[];

  closeResult: string;
  oneCountry: Country = new Country();
  oneContinent: Continent = new Continent();

  oneLanguage: Language = new Language();

  countries: Country[] = [];
  continents: Continent[] = [];
  loading = true;
  error: any;

  page = 1;
  pageSize = 10;
  collectionSize = this.countries.length;
  myfilter;

  constructor(private query: Query, private modalService: NgbModal, config: NgbModalConfig, pipe: DecimalPipe) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

   search(text: string, pipe: PipeTransform): Country[] {
    return this.countries.filter(country => {
      const term = text.toLowerCase();
      return country.name.toLowerCase().includes(term)
          || pipe.transform(country.code).includes(term)
          || pipe.transform(country.phone).includes(term)
          || pipe.transform(country.currency).includes(term);
    });
  }
  

  ngOnInit() {
    this.getContinents();
    // this.getCountry();
  }

  toggleContry() {
      this.flag=!this.flag;
  }


  getContinents(){
    return this.query.getContinents().valueChanges.subscribe(result => {
      this.error = result.errors;
      this.loading = result.loading;
      this.continents = result.data.continents; console.log(result.data);
      this.collectionSize = this.countries.length;

    });
  }

  // getCountries() {
  //   return this.query.getCountries().valueChanges.subscribe(result => {
  //     this.error = result.errors;
  //     this.loading = result.loading;
  //     this.countries = result.data.countries; console.log(this.countries);
  //     this.collectionSize = this.countries.length;

  //   });
  // }


  get countriesArray() {
    return this.countries.map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getCountry(code: string) {
    return this.query.getCountry(code).valueChanges.subscribe(result => {
      this.error = result.errors;
      this.loading = result.loading;
      this.oneCountry = result.data.country;

    });
  }

  getContinent(code: string) {
    return this.query.getContinent(code).valueChanges.subscribe(result => {
      this.error = result.errors;
      this.loading = result.loading;
      this.oneContinent = result.data.continent;
      this.countries = this.oneContinent.countries;
      this.collectionSize = this.countries.length;

      console.log(this.oneContinent);
    });
  }


  getLanguage(code: string) {
    return this.query.getLanguage(code).valueChanges.subscribe(result => {
      this.error = result.errors;
      this.loading = result.loading;
      this.oneLanguage = result.data.language;
    });
  }


  openContinentModal(viewContinent, code) {
    this.getContinent(code);
    console.log(this.oneContinent);
    this.modalService.open(viewContinent,  {  size: 'xl'});
  }

  openContryModal(viewCountry, code) {
    this.getCountry(code);
    console.log(this.oneCountry);
    this.modalService.open(viewCountry, { centered: true });
  }

  openLanguageModal(viewLanguage, code) {
    this.getLanguage(code);
    console.log(this.oneLanguage);
    this.modalService.open(viewLanguage, { centered: true });
  }


}

