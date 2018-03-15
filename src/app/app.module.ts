import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http'; 
import { setContext } from 'apollo-link-context';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const uri = '/graphql';
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache(),
      connectToDevTools: true
    });


    // const http = httpLink.create({uri: '/graphql'});

    // const auth = setContext((_, { headers }) => {
    //   const token = 'a28d0b5c74f0f92acceb397a588ab4f8bef8a0ac';
    //   if (!token) {
    //     return {};
    //   } else {
    //     return {
    //       headers: headers.append('Authorization', `Bearer ${token}`)
    //     };
    //   }
    // });

    // apollo.create({
    //   link: auth.concat(http),
    //   cache: new InMemoryCache(),
    // });
  }
}

