
 ## apollo-client: 
                Client for graphql with angular

 ## apollo-angular: 
                Bridge between Angular and Apollo Client

 ## apollo-cache-inmemory: 
                 recommended cache 

 ## APOLLO_OPTIONS : 
                provides options to Apollo Client

 ## apollo-angular-link-http: 
                An Apollo Link for remote data fetching

 ## HttpLink :
                TO connect client to server , requires HttpClient of angular

 ## graphql: 
            For graphql

 ## graphql-tag: 
            Parses  strings to GraphQL documents

 --> `The apollo-client package requires AsyncIterable so make sure your tsconfig.json includes [esnext.asynciterable]` 

 ## Apollo :--
             is an Angular service exported from apollo-angular to share GraphQL data with your UI.

## gql :- 
        method from graphql-tag in which we pass our graphql query

## Appolo.watchQuery() :--
            The watchQuery method returns a [QueryRef] object which has the [valueChanges] property that is an Observable.
            The returned Observalbe contains loading, error , data propoerty .

--> ApolloClient takes care of loading and error property and once the data came it will load to data property.




--> ` here  uri = 'https://countries.trevorblades.com/' is a public qraphql server uri that gives continental and contries info `

## Step:-- 
    1. First we need to import ApolloModule for working with Apollo
    2. We will add a provider that will connect to graphql server and Initiliaze InMemoryCache
    3. For querying first inject Apollo service in contructor , then call wathcQuery() and pass query as gql .
    4. That returnes valueChanges property as observable that traces loading, error and data