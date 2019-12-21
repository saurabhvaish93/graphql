import { Country } from './../dto/country';
import { Language } from './../dto/language';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

export class Query {

    constructor(private apollo: Apollo) { }

    // get language
    getLanguage(lcode: string): QueryRef<Language> {

        return this.apollo.watchQuery<Language>({
            query: gql`{
                languages($code: String){
                    code
                    name
                    native
                  }
            }`,
            variables: {
                code: lcode
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
    getCountry(ccode: string): QueryRef<Country> {

        return this.apollo.watchQuery<Country>({
            query: gql`{
                 country($code: String){
                    code
                    name
                    native
                    phone
                    currency
                   }
             }`,
            variables: {
                code: ccode
            }
        });
    }


    // get countries
    getCountries(): QueryRef<Country> {

        return this.apollo.watchQuery<Country>({
            query: gql`{
                 country(){
                    code
                    name
                    native
                    phone
                    currency
                   }
             }`
        });
    }


}
