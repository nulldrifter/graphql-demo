import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'; // passes queries into apollo-client

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  loading = false;
  objectKeys = Object.keys; // make this available to our template for easy obj iteration
  films: any;
  activeCharacterID: string;
  activeCharacterBio: any;
  public data: any;
  public cachedData: any;

  /**
   * Fetches and displays character info for a single person
   * @param characterURL (String) - the character's its SWAPI people URL
   */
  showCharBio(characterURL) {
    this.loading = true;

    // extract the character's ID
    const id = characterURL.match(/\D+(\d{1,2})\/$/)[1] // https://swapi.co/api/people/20/  => 20
    this.activeCharacterID = id

    // get the character's bio
    // TODO: pass in vars instead of inlining them
    this.apollo.query({
      query: gql`
      query ($id: String = "${id}") {
        people_one(id: $id) {
          name
          gender
          height
          mass
          skin_color
          birth_year
          eye_color
          hair_color
        }
      }
    `
    }).subscribe((res:any) => {
      const { data, loading } = res;
      this.activeCharacterBio = data.people_one;
      this.loading = loading;
    })
  };

  // TODO: sort films by episode_id
  // TODO: sort characters by films.appearance.length() DESC
  private queryAllFilms: string = gql`
  {
    films {
      title,
      episode_id
      characters {
        name
        url
      }
    }
  }
  `;

  // get all films and update cache
  constructor(private apollo: Apollo) {
    apollo.watchQuery<any>({ query: this.queryAllFilms }).valueChanges.subscribe(({ data }) => {
      this.data = data;
      this.films = data.films;
      this.readQuery();
    });
  }

  readQuery() {
    this.cachedData = this.apollo.getClient().readQuery({ query: this.queryAllFilms });
  }
}
