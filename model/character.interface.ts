export interface Character {
  url: string,
  name: string
}

export interface CharacterBio extends Character {
  gender: string,
  height: number,
  mass: number,
  skin_color: string,
  birth_year: string,
  eye_color: string,
  hair_color: string
}
