import { Country } from './../dto/country';
import { Language } from './../dto/language';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

@Injectable({
  'providedIn': 'root'
})
export class Query {

    constructor(private apollo: Apollo) { }

    // get language
    getLanguage(lcode: string): QueryRef<any> {

        return this.apollo.watchQuery<any>({
            query: gql`
            query getLanguage($ccode: String){
                language(code: $ccode){
                    code
                    name
                    native
                  }
            }`,
            variables: {
                "ccode": lcode
            }
        });
    }


    // get languages
    getLanguages(): QueryRef<Language> {

        return this.apollo.watchQuery<Language>({
            query: gql`{
                languages($code: String){
                    code
                    name
                    native
                  }
            }`
        });
    }


    // get language
    getCountry(countryCode: string): QueryRef<any> {
        return this.apollo.watchQuery<any>({
            query: gql`
              query getCountry($ccode: String){
                 country(code: $ccode){
                    code
                    name
                    native
                    phone
                    currency
                    languages{
                      name
                      code
                    }
                   }
            }`,
            variables: {
                "ccode": countryCode
            }
        });
    }


    // get countries
    getCountries(): QueryRef<any> {

        return this.apollo.watchQuery<any>({
            query: gql`{
                 countries{
                    code
                    name
                    native
                    phone
                    currency
                    languages {
                        name
                        code
                        native
                    }
                }
             }`
        });
    }

// get countries
getContinents(): QueryRef<any> {

    return this.apollo.watchQuery<any>({
        query: gql`{
             continents{
                code
                name
               
            }
         }`
    });
}

// get language
getContinent(continentCode: string): QueryRef<any> {
    return this.apollo.watchQuery<any>({
        query: gql`
          query getContinent($ccode: String){
             continent(code: $ccode){
                code
                name
                countries {
                    code
                    name
                    native
                    phone
                    currency
                    languages {
                        name
                        code
                        native
                        }
                }
            }
        }`,
        variables: {
            "ccode": continentCode
        }
    });
}



}
