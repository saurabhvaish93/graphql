import { Country } from './../dto/country';
import { Language } from './../dto/language';
import { Query } from './../query/query';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  language: Language[];

  countries: Country[] = [] ;

  loading = true;
  error: any;

  data: Observable<any>;

  constructor( private apollo: Apollo) { }

  ngOnInit() {

   this.data = this.apollo.watchQuery<any>({
      query: gql`{
        countries{
              code
              name
              native
              phone
              currency
             }
       }`
  }).valueChanges;
  //   this.apollo.watchQuery<Country>({
  //     query: gql`{
  //       countries{
  //             code
  //             name
  //             native
  //             phone
  //             currency
  //            }
  //      }`
  // }).valueChanges.subscribe(result => {
  //     this.error = result.errors; console.log(this.error);
  //     this.loading = result.loading; console.log(result.data);
  //     this.countries.push(result.data);
  //   });
    // this.query.getCountries().valueChanges.subscribe(result => {
    //   this.error = result.errors;
    //   this.loading = result.loading;
    //   this.countries.push(result.data.Country);
    // });

    // console.log(this.error);
    console.log(this.countries);

  }

}
