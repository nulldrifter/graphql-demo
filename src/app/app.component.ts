import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'; // passes queries into apollo-client

import { Character, CharacterBio } from '../../model/character.interface';
import Film from '../../model/film.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  loading = false;
  objectKeys = Object.keys; // make this available to our template for easy obj iteration
  films: Film[];
  activeCharacterID: string;
  activeCharacterBio: Character;
  data: Object[];
  cachedData: Object[];

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
    }).subscribe(({data, loading}) => {
      this.activeCharacterBio = data['people_one'];
      this.loading = loading;
    })
  };

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

  constructor(private apollo: Apollo) {
  }

  readQuery() {
    this.cachedData = this.apollo.getClient().readQuery({ query: this.queryAllFilms });
  }

  ngOnInit() {
    // get all films and update cache
    this.apollo
      .watchQuery<any>({ query: this.queryAllFilms })
      .valueChanges.subscribe(({ data }) => {
        this.data = data;
        
        this.films = <Film[]>Array.from(data.films)
          .sort((a, b) => {
            const film1: any = a,
              film2: any = b;
            return film1.episode_id - film2.episode_id;
          });

        // TODO: rm this; for demo ONLY
        let x = 0, y = 4;
        this.films[x] = this.films.splice(y, 1, this.films[x])[0];
        x = 1, y = 5;
        this.films[x] = this.films.splice(y, 1, this.films[x])[0];

        this.readQuery();
      });
  }
}
