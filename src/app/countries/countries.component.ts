import { Country } from './../dto/country';
import { Language } from './../dto/language';
import { Query } from './../query/query';
import { Component, OnInit, Directive, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { JsonPipe } from '@angular/common';



export type SortDirection = 'asc' | 'desc' | '';

const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}





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

  page = 1;
  pageSize = 10;
  collectionSize = this.countries.length;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private query: Query, private apollo: Apollo) { }

  ngOnInit() {

  //  this.data = this.apollo.watchQuery<any>({
  //     query: gql`{
  //       countries{
  //             code
  //             name
  //             native
  //             phone
  //             currency
  //            }
  //      }`
  // }).valueChanges;
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
    this.query.getCountries().valueChanges.subscribe(result => {
      this.error = result.errors;
      this.loading = result.loading;
      this.countries = result.data.countries;
      this.collectionSize = this.countries.length;

      // this.countries.push(result.data);
    });

    // console.log(this.error);
    console.log(this.countries);

  }


  get countrys(): Country[] {
    return this.countries
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.countries = this.countries;
    } else {
      this.countries = [...this.countries].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }



}
